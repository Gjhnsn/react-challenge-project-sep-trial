import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../components/login/loginSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'auth',
  storage,
}

const persistedLogin = persistReducer(persistConfig, loginSlice)

const store = configureStore({
  reducer: {
    login: persistedLogin,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {},
      serializableCheck: false
    })
  }
});

const persistor = persistStore(store)

export {store, persistor};
