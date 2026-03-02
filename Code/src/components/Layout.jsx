import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SplineBackground from './SplineBackground';
import './Layout.css';

function Layout() {
  return (
    <div className="app-layout">
      <SplineBackground />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
