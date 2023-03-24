import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Controller, useForm } from 'react-hook-form';
import { INewItem } from '../types/types';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useTable } from '../hooks/useTable';
import { Error } from './Error';
import { Loading } from './Loading';

export const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	maxHeight: '80%',
	overflowY: 'scroll',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

export const ModalCreate: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const ref = useRef<HTMLFormElement>();

	const { handleSubmit, control } = useForm<INewItem>();

	const { createItem } = useTable();

	const queryClient = useQueryClient();

	const {
		mutate: handleCreate,
		isLoading,
		isError
	} = useMutation((newItem: INewItem) => createItem(newItem), {
		onSuccess: () => queryClient.invalidateQueries(['data'])
	});

	const onSubmit = (data: INewItem) => {
		handleCreate(data);
	};

	useEffect(() => {
		if (!isLoading) {
			if (!isError) {
				setOpen(false);
			}
		}
	}, [isLoading]);

	useEffect(() => {
		if (isError) {
			if (ref && ref.current) {
				ref.current.scrollTop = 0;
			}
		}
	}, [isError]);

	return (
		<div>
			<Button onClick={() => setOpen(true)}>Добавить</Button>

			<Modal
				keepMounted
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='keep-mounted-modal-title'
				aria-describedby='keep-mounted-modal-description'
			>
				<Box
					ref={ref}
					sx={style}
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					{isError && <Error />}
					<Controller
						name={'companySigDate'}
						control={control}
						defaultValue={new Date().toISOString()}
						render={() => (
							<TextField
								margin='normal'
								fullWidth
								disabled
								defaultValue={new Date().toISOString()}
								type='text'
								label='companySigDate'
								InputLabelProps={{
									shrink: true
								}}
								id='companySigDate'
							/>
						)}
					/>

					<Controller
						name={'companySignatureName'}
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<TextField
								onChange={onChange}
								error={error !== undefined}
								helperText={
									error?.type === 'required' &&
									'Please input companySignatureName!'
								}
								margin='normal'
								fullWidth
								label='companySignatureName'
								type='text'
								id='companySignatureName'
							/>
						)}
					/>
					<Controller
						name={'documentName'}
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<TextField
								onChange={onChange}
								error={error !== undefined}
								helperText={
									error?.type === 'required' && 'Please input documentName!'
								}
								margin='normal'
								fullWidth
								label='documentName'
								type='text'
								id='documentName'
							/>
						)}
					/>
					<Controller
						name={'documentStatus'}
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<TextField
								onChange={onChange}
								error={error !== undefined}
								helperText={
									error?.type === 'required' && 'Please input documentStatus!'
								}
								margin='normal'
								fullWidth
								label='documentStatus'
								type='text'
								id='documentStatus'
							/>
						)}
					/>
					<Controller
						name={'documentType'}
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<TextField
								onChange={onChange}
								error={error !== undefined}
								helperText={
									error?.type === 'required' && 'Please input documentType!'
								}
								margin='normal'
								fullWidth
								label='documentType'
								type='text'
								id='documentType'
							/>
						)}
					/>
					<Controller
						name={'employeeNumber'}
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<TextField
								onChange={onChange}
								error={error !== undefined}
								helperText={
									error?.type === 'required' && 'Please input employeeNumber!'
								}
								margin='normal'
								fullWidth
								label='employeeNumber'
								type='text'
								id='employeeNumber'
							/>
						)}
					/>
					<Controller
						name={'employeeSigDate'}
						control={control}
						defaultValue={new Date().toISOString()}
						render={() => (
							<TextField
								margin='normal'
								fullWidth
								defaultValue={new Date().toISOString()}
								disabled
								type='text'
								label='employeeSigDate'
								InputLabelProps={{
									shrink: true
								}}
								id='employeeSigDate'
							/>
						)}
					/>
					<Controller
						name={'employeeSignatureName'}
						control={control}
						rules={{
							required: true
						}}
						render={({ field: { onChange }, fieldState: { error } }) => (
							<TextField
								onChange={onChange}
								error={error !== undefined}
								helperText={
									error?.type === 'required' &&
									'Please input employeeSignatureName!'
								}
								margin='normal'
								fullWidth
								label='employeeSignatureName'
								type='text'
								id='employeeSignatureName'
							/>
						)}
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						sx={{ mt: 3, mb: 2 }}
					>
						{isLoading ? <Loading color='inherit' /> : 'Добавить'}
					</Button>
				</Box>
			</Modal>
		</div>
	);
};
