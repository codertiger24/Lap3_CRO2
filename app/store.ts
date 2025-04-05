import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImagePickerResponse } from 'react-native-image-picker';

// Y change provider
const initialState = {
    value: 0
};
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        }
    }
});
export const { increment, decrement } = counterSlice.actions;

// Create images slice
const imagesSlice = createSlice({
    name: 'images',
    initialState: {
        selectedImages: [] as ImagePickerResponse[]
    },
    reducers: {
        addImage: (state, action) => {
            state.selectedImages.push(action.payload);
        },
        removeImage: (state, action) => {
            state.selectedImages = state.selectedImages.filter(
                (_, index) => index !== action.payload
            );
        },
        clearImages: (state) => {
            state.selectedImages = [];
        }
    }
});

// Export actions
export const { addImage, removeImage, clearImages } = imagesSlice.actions;

// Combine reducers
const rootReducer = combineReducers({
    counter: counterSlice.reducer,
    images: imagesSlice.reducer,
});

// Configure persist
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['images'] // Only images will be persisted
};

// Create persisted reducer
const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
    persistConfig,
    rootReducer
);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        })
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 