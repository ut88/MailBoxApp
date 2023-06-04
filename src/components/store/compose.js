import { createSlice } from "@reduxjs/toolkit";

const composeSlicer=createSlice({
    name:"compose",
    initialState:{
        state:false,
    },
    reducers:{
        toggle(state,actions){
            state.state=actions.payload;
        },
    }
})
export const composeActions=composeSlicer.actions;
const composeReducer=composeSlicer.reducer;
export default composeReducer