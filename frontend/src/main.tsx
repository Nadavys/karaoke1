import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { SongListProvider } from './SongContext';
import ReactGA from 'react-ga4';

// Access the environment variable
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
console.log('mode',import.meta.env.MODE)
const mode = import.meta.env.MODE;

// Initialize Google Analytics with the environment-specific measurement ID
if (gaMeasurementId && mode === 'production') {
  ReactGA.initialize(gaMeasurementId);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <SongListProvider>
    <App />
  </SongListProvider>

)
