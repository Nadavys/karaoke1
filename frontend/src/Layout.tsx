

import './App.css'
import retroBg from './assets/retro-bg.jpg';
import Header from './components/Header';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

function Layout({children}: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return (
    <div className="min-h-screen w-full pb-4" style={{ backgroundImage: `url(${retroBg})`, backgroundRepeat: 'repeat-x', backgroundSize: 'contains', backgroundColor: '#5E165F', backgroundPosition: "top", backgroundAttachment: 'fixed' }}>
      <Header/>
      {children}
    </div>
  )
}

export default Layout
