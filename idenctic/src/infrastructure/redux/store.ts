// Redux Store Configuration

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@/presentation/redux/slices/authSlice";
import imageReducer from "@/presentation/redux/slices/verificationSlice";
import historyReducer from "@/presentation/redux/slices/historySlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "image"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  image: imageReducer,
  histories: historyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
