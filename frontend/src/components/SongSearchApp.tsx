import { useEffect, useState } from 'react';

import SongList from './SongList'

import { Video } from '../types';
import SearchBar from './SearchBar';
import { getStaticSongList } from '../utils';

const queryParams = new URLSearchParams(window.location.search);
const initialSearchQuery = queryParams.get('q') || '';

function App() {
  const [foundVideoList, setFoundVideoList] = useState<Video[]>([]); // Use state for list
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    setFoundVideoList(getStaticSongList(searchQuery).sort((a, b) => a.title.localeCompare(b.title)))
  }, [searchQuery]);


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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} foundVideoList={foundVideoList} />
      <SongList list={foundVideoList} />
    </>
  )
}

export default App
