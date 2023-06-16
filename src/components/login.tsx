import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    createUser({ name })
      .then(() => {
        setLoading(false);
        navigate.push('/search');
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error:', error);
      });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const isButtonDisabled = name.length < 3;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nameInput">
        Nome:
        <input
          type="text"
          id="nameInput"
          value={name}
          onChange={handleNameChange}
          data-testid="login-name-input"
        />
      </label>
      <button
        type="submit"
        disabled={isButtonDisabled}
        data-testid="login-submit-button"
      >
        Entrar
      </button>
      {loading && <p>Carregando...</p>}
    </form>
  )
};

export default LoginForm;
