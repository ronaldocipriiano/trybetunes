import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';

function Layout() {
  const location = useLocation();

  if (location.pathname === '/login') {
    return <Outlet />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
