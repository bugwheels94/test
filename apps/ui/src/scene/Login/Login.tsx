import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import './Login.scss';
import { loginUser } from '../../services/auth';
import { useAuth } from '../components/Authenticator/AuthProvider';

// Function to handle the login API request

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login();

      // Handle successful login (e.g., redirect or show success message)
    },
    onError: (error) => {
      console.error('Login error:', error);
      // Handle login error (e.g., show error message)
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {mutation.error && (
          <div className="error-message">{mutation.error.message}</div>
        )}{' '}
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
