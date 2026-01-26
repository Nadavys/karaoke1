import { useEffect, useState } from 'react';

import SongList from './SongList'

import { Video } from '../types';
import { getStaticSongList } from '../utils';
import { useAppSelector } from '../redux/hooks';
import { selectSearchQuery } from '../redux/searchSlice';

function App() {
  const [foundVideoList, setFoundVideoList] = useState<Video[]>([]);
  const searchQuery = useAppSelector(selectSearchQuery);

  useEffect(() => {
    setFoundVideoList(getStaticSongList(searchQuery).sort((a, b) => a.title.localeCompare(b.title)))
  }, [searchQuery]);

  useEffect(() => {
    // Function to update the URL without reloading the page
    const updateURL = (query: string) => {
      const newUrl = window.location.pathname + (query ? `?q=${query}` : '');
      window.history.pushState({ path: newUrl }, '', newUrl);
    };

    updateURL(searchQuery);
  }, [searchQuery]);

  return (
    <>
      {searchQuery && (
        <div className="flex justify-center py-3 px-4">
          {foundVideoList.length > 0 ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-100 text-green-800 border border-green-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Found {foundVideoList.length} matches</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-100 text-red-800 border border-red-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>No songs found</span>
            </div>
          )}
        </div>
      )}
      <SongList list={foundVideoList} />
    </>
  )
}

export default App
