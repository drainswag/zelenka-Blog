import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IsAdminState {
    flag:boolean
}

const initialState: IsAdminState = {
    flag: false
}
export const IsAdminSlice = createSlice({
    name:'isAdmin',
    initialState,
    reducers:{
        setFlag:(state, action:PayloadAction<boolean>) =>{
            state.flag = action.payload;
        }
    }
})

export const {setFlag} = IsAdminSlice.actions;

export default IsAdminSlice.reducer