import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import signUpReducer from "../features/signUpSlice";
const persistConfig = {
  key: "root",
  storage, // 저장 공간
  whitelist: ["signUp", "auth"], // persist 적용하고 싶은 값
  blacklist: [], // persist 적용하지 않을 내용
};

const reducer = combineReducers({
  signUp: signUpReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
