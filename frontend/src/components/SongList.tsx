
import { useAppDispatch } from "../redux/hooks";
import type { Video } from "../types";
import { playVideo } from '../utils'
import { addToPlaylist } from '../redux/playlistSlice'


function SongList({ list }: { list: Video[] }) {
  return (
    <div className="song container mx-auto">
      <ul>
        {list.map((item) => {
          return <SongItem key={item.id} item={item} />
        })
        }
      </ul>
    </div>
  )
}

export default SongList;



function SongItem({ item }: { item: Video }) {
  const dispatch = useAppDispatch()

  const handleClick = (video: Video) => {
    playVideo(video)
  }

  const handleAddPlaylist = (video: Video, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(addToPlaylist(video.id));
  }
  return (
    <li className="transition-all delay-50 max-w-2xl mx-auto bg-gray-100 rounded-2xl border-2 border-gray-300 shadow-xl overflow-hidden hover:bg-purple-800 hover:text-white  my-4 cursor-pointer" onClick={() => handleClick(item)}>

      <div className="flex" >
        <div className="flex flex-col justify-between flex-1 p-5" >
          <p className="text-lg font-semibold">{item.title}</p>

          <div className="flex  gap-1 justify-between mt-2">
            <button className="flex-1 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-2 rounded">
              Play
            </button>

            <button
              onClick={(e) => { handleAddPlaylist(item, e) }}
              className="active:bg-zinc-200 active:text-black  flex-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Add To Playlist
            </button>
          </div>
        </div>

        <div className="flex-none">
          <img className="object-cover w-48 h-full" src={item?.thumbnail} alt={item.title} />
        </div>
      </div>

    </li>
  )
}






