import { useDispatch } from 'react-redux';
import { setAuth } from 'store/reducers/authSlice';

export const useAuth = () => {
	const dispatch = useDispatch();
	const isAuth = () => {
		return localStorage.getItem('token');
	};

	const init = () => {
		if (isAuth()) {
			dispatch(setAuth(true));
		}
	};

	const logout = () => {
		localStorage.clear();
		dispatch(setAuth(false));
	};

	return { init, logout };
};
