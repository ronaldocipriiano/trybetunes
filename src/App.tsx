import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginForm from './components/login';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <LoginForm />
    </div>
  );
}

export default App;
