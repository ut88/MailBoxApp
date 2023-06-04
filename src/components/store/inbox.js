import { createSlice } from "@reduxjs/toolkit";

const inboxSilcer=createSlice({
    name:"inbox",
    initialState:{
        condition:true,
    },
    reducers:{
        toggle(state,actions){
           state.condition=actions.payload;
        }
    }
})

export const inboxActions= inboxSilcer.actions;
export default inboxSilcer.reducer;