import { Video } from "./SongContext"

export function getYouTubeUrl(video: Video): string{
    return `https://www.youtube.com/watch?v=${video.id}`
}