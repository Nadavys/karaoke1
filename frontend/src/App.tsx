

import './App.css'
import SongList from './components/SongList'
import retroBg from './assets/retro-bg.jpg';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { Video, useSongList } from './SongContext';
import Header from './components/Header';


const queryParams = new URLSearchParams(window.location.search);
const initialSearchQuery = queryParams.get('q') || '';

function App() {

  const { getList } = useSongList()
  const [foundVideoList, setFoundVideoList] = useState<Video[]>([]); // Use state for list


  console.log('initialSearchQuery', {initialSearchQuery}, queryParams)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    setFoundVideoList(getList(searchQuery).sort((a, b) => a.title.localeCompare(b.title)))
  }, [searchQuery, getList]);


  useEffect(() => {
    // Function to update the URL without reloading the page
    const updateURL = (query: string) => {

      const newUrl = window.location.pathname + query ? `?q=${query}` : '';
      window.history.pushState({ path: newUrl }, '', newUrl);
    };

    updateURL(searchQuery);
  }, [searchQuery]);





  return (
    <>
      <div className="min-h-screen w-full pb-4" style={{ backgroundImage: `url(${retroBg})`, backgroundRepeat: 'repeat-x', backgroundSize: 'contains', backgroundColor: '#5E165F', backgroundPosition: "top" }}>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} foundVideoList={foundVideoList} />
        <SongList list={foundVideoList} />
      </div>
      <Footer />
    </>
  )
}

export default App
