import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onLogin(email);
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="platform-name">Support Our Cause</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login to Continue</h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}