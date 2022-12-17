import { configureStore } from '@reduxjs/toolkit'
import county from './county'




const store = configureStore({
  reducer: {
   county
  },
})

export default store
