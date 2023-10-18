import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationButtonSchema } from '../types/notificationButtonSchema';

const initialState: NotificationButtonSchema = {
    
};

export const notificationButtonSlice = createSlice({
    name: 'notificationButton',
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

export const { actions: notificationButtonActions } = notificationButtonSlice;
export const { reducer: notificationButtonReducer } = notificationButtonSlice;