'use client'
import { NavLink } from 'react-router-dom';
import logoImg from '../assets/logo1.png'
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,

} from '@headlessui/react'
import {

  Bars3Icon,

  XMarkIcon,
} from '@heroicons/react/24/outline'


import { useAppSelector } from '../redux/hooks'
import { playListSize } from '../redux/playlistSlice'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="backdrop-blur-lg backdrop-saturate-50 _py-2 sticky top-0 " >
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between _p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Karaoke Party</span>
            <img alt="" src={logoImg} className="_h-8 w-auto px-1 max-h-[65px]" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">

          <NavLink to="/"
            className={({ isActive }) => `text-sm font-semibold leading-6   hover:bg-slate-800 py-2 px-4 rounded ${isActive ? 'text-blue-400' : 'text-gray-100'}`}>
            Search
          </NavLink>

          <NavLink to="/playlist"
            className={({ isActive }) => `text-sm font-semibold leading-6   hover:bg-slate-800 py-2 px-4 rounded ${isActive ? 'text-blue-400' : 'text-gray-100'}`}>
            Playlist
            <PlaylistNumberBadge />
          </NavLink>


          <NavLink to="/about"
            className={({ isActive }) => `text-sm font-semibold leading-6   hover:bg-slate-800 py-2 px-4 rounded ${isActive ? 'text-blue-400' : 'text-gray-100'}`}>
            About
          </NavLink>

        </PopoverGroup>



      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Karaoke Party</span>
              <img
                alt=""
                src={logoImg}
                className="_w-5 _w-auto w-20"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">

                <NavLink to="/"
                  onClick={closeMenu}
                  className={({ isActive }) => `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50 ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                  Search
                </NavLink>


                <NavLink to="/playlist"
                  onClick={closeMenu}
                  className={({ isActive }) => `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50 ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                  Playlist
                  <PlaylistNumberBadge />
                </NavLink>

                <NavLink to="/about"
                  onClick={closeMenu}
                  className={({ isActive }) => `-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50 ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                  About
                </NavLink>

              </div>
              <div className="py-6">

              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}


function PlaylistNumberBadge() {
  const size = useAppSelector(playListSize)
  if (!size) return null


  return (
    <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
      {size}
    </span>
  )
}