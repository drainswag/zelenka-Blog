import { configureStore } from '@reduxjs/toolkit'
import paginationReducer from './slices/pagination'
import isAdminReducer from './slices/isAdmin';

export const store = configureStore({
    reducer:{
        isAdmin: isAdminReducer,
        paginationPages: paginationReducer,

    }
})

export type store = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export default store