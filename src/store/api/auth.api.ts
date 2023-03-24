import { createAsyncThunk } from '@reduxjs/toolkit';
import { URLS } from '../../constants/urls';
import { IUser } from '../../types/types';
import $api from '../../api/wrapper';
import {
	AnyAsyncThunk,
	RejectedWithValueActionFromAsyncThunk
} from '@reduxjs/toolkit/dist/matchers';

export const userLogin = createAsyncThunk(
	'auth/login',
	async (user: IUser, { rejectWithValue }) => {
		try {
			const { data } = await $api.post(URLS.AUTH, user);
			localStorage.setItem('token', data.data.token);

			return data;
		} catch (error) {
			const err = error as RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>;

			if (err.response && err.response.data.message) {
				return rejectWithValue(err.response.status);
			} else {
				return rejectWithValue(err.response.status);
			}
		}
	}
);
