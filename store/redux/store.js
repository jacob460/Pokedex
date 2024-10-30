import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
  
const persistedReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
    reducer: {
        favPokemon: persistedReducer,
        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);