

import './App.css'
import retroBg from './assets/retro-bg.jpg';
import Header from './components/Header';
import Footer from './components/Footer';
import { ReactNode } from 'react';

function Layout({children}: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen w-full pb-4" style={{ backgroundImage: `url(${retroBg})`, backgroundRepeat: 'repeat-x', backgroundSize: 'contains', backgroundColor: '#5E165F', backgroundPosition: "top" }}>
        <Header/>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout
