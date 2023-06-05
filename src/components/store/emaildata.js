import { createSlice } from "@reduxjs/toolkit";

const emailsdataSlice=createSlice({
    name:"emaildata",
    initialState:{
       email:{},
    },
    reducers:{
        setemailData(state,actions){
            state.email={
                ...actions.payload
            }
        }
    }
})

export const emaildataActions=emailsdataSlice.actions;

export default emailsdataSlice.reducer;
