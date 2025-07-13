import { configureStore } from '@reduxjs/toolkit'
import rosterReducer from './slices/rosterSlice'

export const store = configureStore({
  reducer: {
    roster: rosterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch