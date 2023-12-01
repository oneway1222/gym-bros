import exerciseTypesSlice from './exerciseTypesSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    exerciseTypes: exerciseTypesSlice 
  },
})