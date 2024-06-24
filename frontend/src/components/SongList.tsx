import { useState, useEffect } from 'react';
import { Video } from "../SongContext";

import { useSongList } from '../SongContext';
import { getYouTubeUrl } from '../utils'

function SongList() {

  const queryParams = new URLSearchParams(window.location.search);
  const initialSearchQuery = queryParams.get('q') || ''; 

  const [list, setList] = useState<Video[]>([]); // Use state for list
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const { getList } = useSongList()

  useEffect(() => {
    setList(getList(searchQuery).sort((a, b) => a.title.localeCompare(b.title)))
  }, [searchQuery, getList]);


  useEffect(() => {
    // Function to update the URL without reloading the page
    const updateURL = (query:string) => {
      const newUrl = `${window.location.pathname}?q=${query}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    };

    updateURL(searchQuery);
  }, [searchQuery]);

  const searchResult = () => {
    if (list.length > 0) {
      return <div className="text-center text-white"  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>Found {list.length} matches</div>;
    } else {
      return <div className="text-center text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>No songs found</div>;
    }
  };


  console.log("found items", list.length)
  return (

    <div>
      <h1 className='text-white text-center text-5xl pt-2 text-pink-200' style={{ fontFamily: 'Cursive', textShadow: '0 0 20px #FFF, 2px 2px 4px rgba(0, 0, 0, 1)' }} >Karaoke Party</h1>

      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="md:flex">
          <div className="w-full p-3">
            <div className="relative">
              <i className="absolute fa fa-search text-gray-400 top-5 left-4"></i>
              <input type="text" className="bg-white h-14 w-full px-12 rounded-lg focus:outline-none hover:cursor-pointer" name=""
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute top-4 right-5 border-l pl-4">
                <SearchIcon />
              </span>
            </div>
          </div>
        </div>
        {searchQuery && searchResult()}

      </div>


      <div className="song">
        <ul>
          {list.map((item) => {
            return <SongItem key={item.id} item={item} />
          })
          }
        </ul>
      </div>
    </div>
  )
}

export default SongList;



function SongItem({ item }: { item: Video }) {
  const handleClick = (video: Video) => {
    const url = getYouTubeUrl(video);
    window.open(url, '_blank');


  }
  return (
    <li className="transition-all delay-50 max-w-2xl mx-auto bg-gray-100 rounded-2xl border-2 border-gray-300 shadow-xl overflow-hidden hover:bg-purple-800 hover:text-white  my-4 cursor-pointer" onClick={() => handleClick(item)}>
      <div className="flex">
        <div className="flex-1 p-5">
          <p className="text-lg font-semibold">{item.title}</p>
          {/* Additional information can be uncommented and styled here */}
        </div>
        <div className="flex-none">
          <img className="object-cover w-48 h-full" src={item?.thumbnail} alt={item.title} />
        </div>
      </div>
    </li>
  )
}


function SearchIcon(): JSX.Element {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
      <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
    </svg>
  );
}