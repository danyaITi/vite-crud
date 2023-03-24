import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userLogin } from '../api/auth.api';
import { AuthState, authStatus } from '../types/auth';

const initialState: AuthState = {
	isAuth: false,
	status: null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		}
	},
	extraReducers: builder => {
		// login
		builder.addCase(userLogin.pending, state => {
			state.status = authStatus.LOADING;
		});
		builder.addCase(userLogin.fulfilled, state => {
			state.status = authStatus.SUCCESS;

			state.isAuth = true;
		});
		builder.addCase(userLogin.rejected, (state, { payload }) => {
			state.status = payload == 404 ? authStatus.SERVER_ERR : authStatus.ERROR;
		});
	}
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
