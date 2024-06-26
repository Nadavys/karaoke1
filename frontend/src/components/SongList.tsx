
import { Video } from "../SongContext";
import { getYouTubeUrl } from '../utils'



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






