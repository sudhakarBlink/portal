import { configureStore } from "@reduxjs/toolkit";
import { Appconfig } from "./Reducer/appconfig";
export const store = configureStore({
    reducer: {
        APP_CONFIG: Appconfig.reducer,
    },
});

