import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { LOCAL_STORAGE_LAST_DESIGN_KEY, USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (sfgsdg, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi;

    const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if (!userId) {
      return rejectWithValue('');
    }
    try {
      const response = await dispatch(getUserByIdQuery(userId)).unwrap();

      if (!response) {
        return rejectWithValue('');
      }
      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        response.features?.isAppRedesigned ? 'new' : 'old',
      );
      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue('');
    }
  },
);
