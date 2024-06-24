import React, { createContext, useContext, useState } from 'react';
import list from '../data/data.json';


export type Video = {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
    publishTime: string;
  };

// Define the context's data structure
interface SongListContextType {
//   songs: string[];
  addSong?: (song: string) => void;
  getSong?: (id: string) => void;
  getList: (input?:any) => Video[];
}


// Create the context
const SongListContext = createContext<SongListContextType | undefined>(undefined);

// Create a provider component
export const SongListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   console.log(list)
//   const [songs, setSongs] = useState<string[]>([]);

//   const addSong = (song: string) => {
//     setSongs((prevSongs) => [...prevSongs, song]);
//   };


    const getList = (input?: string | null) => {
        if(input){
            return list.filter((item) => item.title.toLowerCase().includes(input.toLowerCase()));
        }
        return list;
    }

  return (
    <SongListContext.Provider value={{ getList  }}>
      {children}
    </SongListContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSongList = () => {
  const context = useContext(SongListContext);
  if (context === undefined) {
    throw new Error('useSongList must be used within a SongListProvider');
  }
  return context;
};