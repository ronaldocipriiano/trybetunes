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
        <Route path="/trybetunes" element={ <LoginForm /> } />
        <Route element={ <Layout /> }>
          <Route path="/trybetunes/search" element={ <Search /> } />
          <Route path="/trybetunes/Album/:id" element={ <Album /> } />
          <Route path="/trybetunes/profile" element={ <Profile /> } />
          <Route path="/trybetunes/profile/edit" element={ <ProfileEdit /> } />
          <Route path="/trybetunes/favorites" element={ <Favorites /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
