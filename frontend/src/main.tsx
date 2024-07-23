import React from 'react'
import ReactDOM from 'react-dom/client'
import SongSearchApp from './components/SongSearchApp.tsx'
import PlayList from './components/PlayList.tsx'
import './index.css'
import './App.css'
import About from './components/About.tsx'

import ReactGA from 'react-ga4';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import debounce from "debounce";
import { saveStateLocalStorage } from './redux/browser-storage.ts'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet, // Add this line
} from "react-router-dom";
import Layout from './Layout.tsx';


store.subscribe(
  debounce(() => {
    console.log('saving store', store.getState())
    saveStateLocalStorage(store.getState());
  }, 1000)
);

// Access the environment variable
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
console.log('mode', import.meta.env.MODE, gaMeasurementId)
const mode = import.meta.env.MODE;

// Initialize Google Analytics with the environment-specific measurement ID
if (gaMeasurementId && mode === 'production') {
  ReactGA.initialize(gaMeasurementId);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><SongSearchApp /></Layout>,
  },
  {
    path: "/PlayList",
    element: <Layout><PlayList /></Layout>,
  },
  {
    path: "/about",
    element: <Layout><About /></Layout>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>

      <RouterProvider router={router} />
      <Outlet />

    </Provider>
  </React.StrictMode>

)
