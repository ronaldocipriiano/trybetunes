import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/pages/Login';
import Search from './components/pages/Search';
import Album from './components/pages/Album';
import Layout from './components/Layout';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <LoginForm /> } />
        <Route element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/Album/:id" element={ <Album /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
