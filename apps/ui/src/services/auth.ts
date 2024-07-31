import { fetchWrapper } from '../utils/fetch';

export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return fetchWrapper('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
};

export const logoutUser = async () => {
  return fetchWrapper('/api/session', {
    method: 'DELETE',
  });
};

export const registerUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return fetchWrapper('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
};
export const checkSession = () => {
  return fetchWrapper('/api/users/me', {});
};
