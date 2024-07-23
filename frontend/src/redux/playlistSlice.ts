import { Video } from '../types';
import { createSlice } from '@reduxjs/toolkit'
import staticSonglist from '../../data/data.json';
import { loadStateLocalStorage } from './browser-storage';

const staticSongMap: Record<string, Video> = staticSonglist.reduce((acc: any, song: Video) => {
    acc[song.id] = song
    return acc
}, {});



const localstoredata = loadStateLocalStorage()
const preloadedState = localstoredata?.playlist?  localstoredata?.playlist : []

const slice = createSlice({
    name: 'playlist',
    initialState: preloadedState,
    reducers: {
        addToPlaylist(state, action) {
            //add only if item is not already in the list
            if (!state.includes(action.payload)) {
                state.push(
                    action.payload
                )
            }
        },
        removeFromPlaylist(state, action) {
            return state.filter((item: string) => item !== action.payload)
        },
        clearPlaylist() {
            return []
        },
        //move this item up in the list
        moveUp(state, action) {
            const index = state.indexOf(action.payload)
            if (index > 0) {
                const temp = state[index - 1]
                state[index - 1] = state[index]
                state[index] = temp
            }
        },
        moveDown(state, action) {
            const index = state.indexOf(action.payload)
            if (index < state.length - 1) {
                const temp = state[index + 1]
                state[index + 1] = state[index]
                state[index] = temp
            }
        }

    }
})
export const getPlayList = (state: any) => state.playlist.map((id: string) => staticSongMap[id]).filter((item: Video) => item)
export const playListSize = (state: any) => state.playlist?.length || 0
export const { addToPlaylist, removeFromPlaylist, moveUp, moveDown, clearPlaylist } = slice.actions
export default slice.reducer