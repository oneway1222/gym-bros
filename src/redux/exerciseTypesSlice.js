import { createSlice } from '@reduxjs/toolkit'

export const exerciseTypesSlice = createSlice({
  name: 'exerciseTypes',
  initialState: {
    exerciseTypes: [],
  },
  reducers: {
    setExerciseTypes : (state, action) => {
        state.exerciseTypes=(action.payload)
    },
    resetExerciseTypes: (state, action) =>{
      state.exerciseTypes = []
    }
  },
})

export const { setExerciseTypes, resetExerciseTypes } = exerciseTypesSlice.actions
export default exerciseTypesSlice.reducer