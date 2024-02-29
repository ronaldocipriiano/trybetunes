import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import logo from '../../images/logo.png';
import './login.css';

function LoginForm() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    createUser({ name })
      .then(() => {
        setLoading(false);
        navigate('/search');
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
    <div className="container-login">
      <form onSubmit={ handleSubmit }>
        <img src={ logo } alt="Logo da empresa" />
        <input
          type="text"
          id="nameInput"
          value={ name }
          onChange={ handleNameChange }
          data-testid="login-name-input"
          placeholder="Qual o seu nome?"
        />
        <button
          type="submit"
          disabled={ isButtonDisabled }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
        {loading && <p>Carregando...</p>}
      </form>
    </div>
  );
}

export default LoginForm;
