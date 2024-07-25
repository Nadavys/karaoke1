import React from 'react';
import logoImg from '../assets/logo1.png'


interface HeaderProps {
    // searchQuery: string;
    // setSearchQuery: (query: string) => void;
    // foundVideoList: Video[];
}

const Header: React.FC<HeaderProps> = () => {


    return (
        <header className="sticky top-0 shadow-md _bg-slate-800 bg-opacity-50 backdrop-blur-lg backdrop-saturate-50 py-2">
            <div className="flex container mx-auto">
                {/* <h1 className='text-white text-center text-5xl pt-2 text-pink-200' style={{ fontFamily: 'Cursive', textShadow: '0 0 20px #FFF, 2px 2px 4px rgba(0, 0, 0, 1)' }} >Karaoke Party</h1> */}
                <img src={logoImg} alt="logo" className="px-1 max-h-[75px]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
                <div className="mx-auto self-center">
        
   

                    karaoke!!
                </div>
            </div>
        </header>
    );
};

export default Header;


