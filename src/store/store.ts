import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const userPersistConfig={
    key:'user',
    storage
}

const userPersistedReducer=persistReducer(userPersistConfig,userSlice)


export const store =configureStore({
    reducer:{
        user:userPersistedReducer
    }
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch