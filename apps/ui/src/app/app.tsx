import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import React, { Suspense, lazy } from 'react';
import { Header } from '../scene/components/Header/Header';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from '../scene/components/Loader/Loader.tsx';
import { AuthProvider } from '../scene/components/Authenticator/AuthProvider';
import { UnprotectedRoute } from '../scene/components/Authenticator/UnprotectedRoute';
import { ProtectedRoute } from '../scene/components/Authenticator/ProtectedRoute';
const Home = lazy(() => import('../scene/Home/Home.tsx'));
const Product = lazy(() => import('../scene/Product/Product.tsx'));
const Login = lazy(() => import('../scene/Login/Login.tsx'));
const Register = lazy(() => import('../scene/Register/Register.tsx'));
const NotFound = lazy(() => import('../scene/NotFound/NotFound.tsx'));

export function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: '/',
              element: (
                <HelmetProvider>
                  <>
                    <Header />
                    <Outlet></Outlet>
                  </>
                </HelmetProvider>
              ),
              children: [
                {
                  path: '/',
                  element: (
                    <ProtectedRoute>
                      <Suspense fallback={<Loader />}>
                        <Home />
                      </Suspense>
                    </ProtectedRoute>
                  ),
                },
                {
                  path: '/login',
                  element: (
                    <UnprotectedRoute>
                      <Suspense fallback={<Loader />}>
                        <Login />
                      </Suspense>
                    </UnprotectedRoute>
                  ),
                },
                {
                  path: '/register',
                  element: (
                    <UnprotectedRoute>
                      <Suspense fallback={<Loader />}>
                        <Register />
                      </Suspense>
                    </UnprotectedRoute>
                  ),
                },
                {
                  path: '/products/:id',
                  element: (
                    <Suspense fallback={<Loader />}>
                      <Product />
                    </Suspense>
                  ),
                },
                {
                  path: '*paramName',
                  element: (
                    <Suspense fallback={<Loader />}>
                      <NotFound />
                    </Suspense>
                  ),
                },
              ],
            },
          ])}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
