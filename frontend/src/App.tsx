

import './App.css'
import SongList from './components/SongList'
import retroBg from './assets/retro-bg.jpg';

function App() {


  return (
    <>
      <div className="min-h-screen w-full pb-4" style={{ backgroundImage: `url(${retroBg})`, backgroundRepeat: 'repeat-x', backgroundSize: 'contains', backgroundColor:'#5E165F', backgroundPosition:"top" }}>
        <div className="container mx-auto" >
          <SongList />
        </div>
      </div>
    </>
  )
}

export default App
