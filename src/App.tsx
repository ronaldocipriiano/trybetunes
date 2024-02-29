import { Route, Routes } from 'react-router-dom';
import LoginForm from './pages/Login/Login';
import Search from './pages/Search/Search';
import Album from './pages/Album/Album';
import Layout from './components/Layout';
import Profile from './pages/Profile/Profile';
import Favorites from './pages/Favorites/Favorites';
import ProfileEdit from './pages/Profile/ProfileEdit';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <LoginForm /> } />
        <Route element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/Album/:id" element={ <Album /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/profile/edit" element={ <ProfileEdit /> } />
          <Route path="/favorites" element={ <Favorites /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
