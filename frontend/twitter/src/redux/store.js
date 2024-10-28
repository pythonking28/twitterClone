import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";

const persistConfig = {
  key: "root",
  storage,
};

const combinedSlice = combineReducers({ user: userSlice, tweet: tweetSlice });
const persistedReducer = persistReducer(persistConfig, combinedSlice);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export default store;
export const persistor = persistStore(store);
