import { Video } from "../types";
import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { getPlayList, removeFromPlaylist, moveUp, moveDown } from '../redux/playlistSlice'
import { playVideo } from '../utils'

import {
  PlayIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

function PlayListContainer() {
  const playList = useAppSelector(getPlayList)

  return (
    <>
      <PlayListView list={playList} />
    </>
  )

}


function PlayListView({ list }: { list: any[] }) {
  const dispatch = useAppDispatch()


  const handlPlayNextClick = () => {
    const video = list[0]
    playVideo(video);
    dispatch(removeFromPlaylist(video.id))
  }


  if (!list.length) {
    return (
      <div className="mx-auto mt-5 flex flex-col items-center bg-gradient-to-r from-blue-500 to-purple-600 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl  ">
        <div className="p-5 flex-1">
          <div className="_mb-2 text-2xl font-bold text-white text-center">The playlist is empty</div>
        </div>
      </div>
    );
  }


  return (
    <div className="song container mx-auto mt-4">

      <div className="text-center">
        <button onClick={handlPlayNextClick} className="font-bold text-lg bg-blue-500 text-white py-3 px-8 rounded-lg cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50" style={{ fontSize: '1.25rem', width: 'auto', minWidth: '200px' }}>
          Play Next
        </button>
      </div>

      <ul>
        {list?.map((item) => <SongItem key={item.id} item={item} />)}
      </ul>
    </div>
  )
}


function SongItem({ item }: { item: Video }) {
  const dispatch = useAppDispatch()


  const handleClick = (video: Video) => {
    playVideo(video);
    //remove from playlist
    dispatch(removeFromPlaylist(video.id))
  }
  return (
    <li className=" max-w-2xl mx-auto bg-gray-100 rounded-2xl border-2 border-gray-300 shadow-xl _overflow-hidden my-2" >
      <div className="p-2">
        {/* <div className="_flex-1 p-2"> */}
        <div className="text-md text-center" >{item.title}</div>
        <div className=" _w-100 _flex _content-center _items-center mt-1">
          <div className="_mx-auto _w-50 _flex _inline-flex rounded-md shadow-sm text-center" role="group">
            <button
              onClick={() => dispatch(moveDown(item.id))}
              type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white ">
              <ChevronDoubleDownIcon className="h-4 w-4" />
              Down
            </button>

            <button
              onClick={() => dispatch(moveUp(item.id))}
              type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
              <ChevronDoubleUpIcon className="h-4 w-4" />
              Up
            </button>

            <button
              onClick={() => dispatch(removeFromPlaylist(item.id))}
              type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-l border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
              <XCircleIcon className="h-4 w-4" />

              Remove
            </button>

            <button
              onClick={() => handleClick(item)}
              type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
              <PlayIcon className="h-4 w-4" />
              Play
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}



export default PlayListContainer;