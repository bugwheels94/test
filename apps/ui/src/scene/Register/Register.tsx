import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import './Register.scss';
import { registerUser } from '../../services/auth';

// Function to handle the register API request

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationFn: registerUser,
  });

  const handleSubmit = () => {
    e.preventDefault();
    mutation.mutate({ username, password });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
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
          {mutation.isPending ? 'Logging in...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
