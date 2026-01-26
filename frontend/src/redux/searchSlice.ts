import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface SearchState {
  query: string
}

const queryParams = new URLSearchParams(window.location.search);
const initialSearchQuery = queryParams.get('q') || '';

const initialState: SearchState = {
  query: initialSearchQuery,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
  },
})

export const { setSearchQuery } = searchSlice.actions

export const selectSearchQuery = (state: RootState) => state.search.query

export default searchSlice.reducer
