import React from 'react';
import logoImg from '../assets/logo1.png'
import { Video } from '../SongContext';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    foundVideoList: Video[];
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, foundVideoList }) => {




    const searchResult = () => {
        if (foundVideoList.length > 0) {
            return <div className="text-center text-blue-700 self-center">Found {foundVideoList.length} matches</div>;
        } else {
            return <div className="text-center text-red-500 self-center">No songs found</div>;
        }
    };

    return (
        <header className="sticky top-0 shadow-md bg-slate-800 bg-opacity-50 backdrop-blur-lg py-2">
            <div className="flex container mx-auto">
                {/* <h1 className='text-white text-center text-5xl pt-2 text-pink-200' style={{ fontFamily: 'Cursive', textShadow: '0 0 20px #FFF, 2px 2px 4px rgba(0, 0, 0, 1)' }} >Karaoke Party</h1> */}
                <img src={logoImg} alt="logo" className=" max-h-[70px]" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
                <div className="max-w-md mx-auto overflow-hidden md:max-w-xl self-center">
                    {/* <div className="md:flex"> */}
                    <div className="_w-full p-3 bg-white rounded-lg flex flex-wrap" >

                        <SearchInput setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
                        {searchQuery && searchResult()}
                    </div>
                    {/* </div> */}


                </div>
            </div>
        </header>
    );
};

export default Header;


function SearchInput({ searchQuery, setSearchQuery }: { searchQuery: string, setSearchQuery: (value: string) => void }): JSX.Element {
    return (
        <div className="xl:w-96">
            <div className="relative _mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"

                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* <!--Search icon--> */}
                <span
                    className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd" />
                    </svg>
                </span>
            </div>
        </div>
    );
}