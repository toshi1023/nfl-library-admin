import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { IRosterDomain } from '@/types/domainTypes'
import { ISearchQuery } from '@/types/fetchTypes'
import { fetchSearchedRoster } from '@/lib/rosterFetch'

interface RosterState {
  rosters: IRosterDomain[]
  loading: boolean
  error: string | null
}

const initialState: RosterState = {
  rosters: [],
  loading: false,
  error: null,
}

// 非同期アクション：ロスター情報を取得
export const fetchRosters = createAsyncThunk(
  'roster/fetchRosters',
  async (query: ISearchQuery) => {
    const response = await fetchSearchedRoster(query)
    if (typeof response === 'string') {
      throw new Error('Failed to fetch rosters')
    }
    return response.data.rosters
  }
)

const rosterSlice = createSlice({
  name: 'roster',
  initialState,
  reducers: {
    setRosters: (state, action: PayloadAction<IRosterDomain[]>) => {
      state.rosters = action.payload
    },
    updateRoster: (state, action: PayloadAction<IRosterDomain>) => {
      const index = state.rosters.findIndex(roster => roster.id === action.payload.id)
      if (index !== -1) {
        state.rosters[index] = action.payload
      }
    },
    deleteRoster: (state, action: PayloadAction<number>) => {
      state.rosters = state.rosters.filter(roster => roster.id !== action.payload)
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRosters.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRosters.fulfilled, (state, action) => {
        state.loading = false
        state.rosters = action.payload
      })
      .addCase(fetchRosters.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch rosters'
      })
  },
})

export const { setRosters, updateRoster, deleteRoster, clearError } = rosterSlice.actions
export default rosterSlice.reducer