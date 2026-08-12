import { Video } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import staticSonglist from '../../data/data.json';
import { loadStateLocalStorage } from './browser-storage';
import type { RootState } from './store';

type PlaylistState = string[]

const staticSongMap: Record<string, Video> = staticSonglist.reduce((acc: Record<string, Video>, song: Video) => {
    acc[song.id] = song
    return acc
}, {});



const localstoredata = loadStateLocalStorage()
const preloadedState: PlaylistState = localstoredata?.playlist ? localstoredata.playlist : []

const slice = createSlice({
    name: 'playlist',
    initialState: preloadedState,
    reducers: {
        addToPlaylist(state, action: PayloadAction<string>) {
            //add only if item is not already in the list
            if (!state.includes(action.payload)) {
                state.push(
                    action.payload
                )
            }
        },
        removeFromPlaylist(state, action: PayloadAction<string>) {
            return state.filter((item) => item !== action.payload)
        },
        clearPlaylist() {
            return []
        },
        //move this item up in the list
        moveUp(state, action: PayloadAction<string>) {
            const index = state.indexOf(action.payload)
            if (index > 0) {
                const temp = state[index - 1]
                state[index - 1] = state[index]
                state[index] = temp
            }
        },
        moveDown(state, action: PayloadAction<string>) {
            const index = state.indexOf(action.payload)
            if (index < state.length - 1) {
                const temp = state[index + 1]
                state[index + 1] = state[index]
                state[index] = temp
            }
        }

    }
})
export const getPlayList = (state: RootState) => state.playlist.map((id: string) => staticSongMap[id]).filter((item: Video | undefined): item is Video => Boolean(item))
export const playListSize = (state: RootState) => state.playlist?.length || 0
export const { addToPlaylist, removeFromPlaylist, moveUp, moveDown, clearPlaylist } = slice.actions
export default slice.reducer