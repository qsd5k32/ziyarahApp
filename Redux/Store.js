import { configureStore } from '@reduxjs/toolkit';
import languageSlice from './slices/Lang'; // Update the path

export const store = configureStore({
  reducer: {
    languageSlice, // Add the language reducer
    // Other reducers...
  },
});
