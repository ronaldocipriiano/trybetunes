import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/pages/Login';
import Search from './components/pages/Search';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <LoginForm /> } />
        <Route path="/search" element={ <Search /> } />
      </Routes>
    </div>
  );
}

export default App;
