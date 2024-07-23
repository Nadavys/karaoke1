import { Video } from "./types";
import staticSongList from '../data/data.json';

export function getYouTubeUrl(video: Video): string{
    return `https://www.youtube.com/watch?v=${video.id}`
}


export function playVideo(video: Video){
    const url = getYouTubeUrl(video);
    window.open(url, '_blank');
}


export const getStaticSongList = (input?: string | null) => {
    if (input) {
      return staticSongList.filter((item) => item.title.toLowerCase().includes(input.toLowerCase()));
    }
    return staticSongList;
  }
