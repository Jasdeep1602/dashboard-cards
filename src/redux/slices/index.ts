import { combineReducers } from '@reduxjs/toolkit'
import CardSlice from './cards'

// combine reducer
const rootReducer = combineReducers({
  card: CardSlice,
})

export default rootReducer
