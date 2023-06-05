import { createSlice } from "@reduxjs/toolkit";

const OutboxSlice = createSlice({
    name: "outbox",
    initialState: {
        condition: false,
    },
    reducers: {
        toggle(state, actions) {
            state.condition = actions.payload;
        }
    }
})
export const OutboxActions = OutboxSlice.actions;

export default OutboxSlice.reducer;