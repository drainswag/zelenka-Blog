import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { store } from '../index'

interface Pages{
    pageCount: number,
    currentPage: number
}

const initialState: Pages ={
    pageCount: 0,
    currentPage: 1
}

export const paginationSlice = createSlice({
    name:'paginationPages',
    initialState,
    reducers:{
        setPageCount:(state,  action: PayloadAction<number>) =>{
            state.pageCount = action.payload;
        },
        setCurrentPage:(state,  action: PayloadAction<number>) =>{
            state.currentPage = action.payload;
        },
    }
})

export const {setPageCount, setCurrentPage} = paginationSlice.actions
export const currentPage = (state:store) => state.paginationPages.currentPage
export const pageCount = (state:store) => state.paginationPages.pageCount
export default paginationSlice.reducer;