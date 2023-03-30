import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Login } from './pages/Login';
import { TableComponent } from './pages/Table';

import { useAuth } from './hooks/useAuth';
import { RequireAuth } from './hoc/RequireAuth';

import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const App = () => {
	const isAuth = useSelector((state: RootState) => state.auth.isAuth);
	const { init, logout } = useAuth();

	// check initialization
	useEffect(() => {
		init();
	}, []);

	return (
		<>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<RequireAuth auth={isAuth} redirectTo='/login'>
								<TableComponent />
							</RequireAuth>
							<span className='logout' onClick={logout}>
								Выход
							</span>
						</>
					}
				/>

				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	);
};

export default App;
