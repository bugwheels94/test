export async function fetchWrapper<T>(url: string, options: RequestInit) {
  const response = await fetch(url, options);

  // Check for HTTP errors
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  // Determine the response type and parse accordingly
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return (await response.json()) as T;
  } else {
    return (await response.text()) as T;
  }
}
