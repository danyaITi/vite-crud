import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Grid, Stack } from '@mui/material';

import { Link, Navigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { IUser } from '../types/types';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { userLogin } from '../store/api/auth.api';
import { Loading } from '../components/Loading';

export const Login = () => {
	const status = useSelector((state: RootState) => state.auth.status);
	const isAuth = useSelector((state: RootState) => state.auth.isAuth);

	const appDispatch = useAppDispatch();

	const { handleSubmit, control } = useForm<IUser>();

	const onSubmit = async (data: IUser) => {
		await appDispatch(userLogin(data));
	};

	if (isAuth) {
		return <Navigate to='/' />;
	}

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				{status === 'error' ? (
					<Stack sx={{ width: '100%' }} spacing={2}>
						<Alert severity='error'>Неверное имя пользователя или пароль</Alert>
					</Stack>
				) : status === 'serverError' ? (
					<Stack sx={{ width: '100%' }} spacing={2}>
						<Alert severity='error'>Ошибка! Попробуйте позже</Alert>
					</Stack>
				) : (
					''
				)}

				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Вход
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					sx={{ mt: 1 }}
				>
					<Controller
						name={'username'}
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<TextField
								onChange={onChange}
								error={error !== undefined}
								helperText={
									error?.type === 'required' && 'Please input your username!'
								}
								margin='normal'
								fullWidth
								id='username'
								label='Username'
								autoComplete='username'
								autoFocus
							/>
						)}
					/>

					<Controller
						name={'password'}
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<TextField
								onChange={onChange}
								error={error !== undefined}
								helperText={
									error?.type === 'required' && 'Please input your password!'
								}
								margin='normal'
								fullWidth
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								name='password'
							/>
						)}
					/>

					<Button
						disabled={status === 'loading'}
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						{status === 'loading' ? <Loading color='inherit' /> : 'Войти'}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};
