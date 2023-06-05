import composeReducer from "./compose";
import { configureStore } from "@reduxjs/toolkit";
import inboxReducer from "./inbox";
import outboxReducer from "./outbox";
import loginReducer from "./login";
import emaildataReducer from "./emaildata"
const store=configureStore({
    reducer:{
        compose:composeReducer,
        inbox:inboxReducer,
        outbox:outboxReducer,
        login:loginReducer,
        emaildata:emaildataReducer,
    }
})

export default store;