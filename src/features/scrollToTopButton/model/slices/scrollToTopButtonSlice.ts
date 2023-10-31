import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollToTopButtonSchema } from '../types/scrollToTopButtonSchema';

const initialState: ScrollToTopButtonSchema = {
    
};

export const scrollToTopButtonSlice = createSlice({
    name: 'scrollToTopButton',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: scrollToTopButtonActions } = scrollToTopButtonSlice;
export const { reducer: scrollToTopButtonReducer } = scrollToTopButtonSlice;