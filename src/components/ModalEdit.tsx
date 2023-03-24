import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

import { Controller, useForm } from 'react-hook-form';
import { memo, useEffect, useRef, useState } from 'react';
import { INewItem, ItemTable } from '../types/types';
import { useMutation, useQueryClient } from 'react-query';
import { useTable } from '../hooks/useTable';
import { Loading } from './Loading';
import { Error } from './Error';
import { style } from './ModalCreate';

interface ModalEditProps {
	data: ItemTable | undefined;
}

export const ModalEdit: React.FC<ModalEditProps> = memo(({ data }) => {
	const [open, setOpen] = useState<boolean>(false);
	const ref = useRef<HTMLFormElement>();

	const { editItem } = useTable();
	const { handleSubmit, control } = useForm<INewItem>();

	const queryClient = useQueryClient();

	const {
		mutate: handleEdit,
		isLoading,
		isError
	} = useMutation((editedItem: INewItem) => editItem(editedItem, data?.id), {
		onSuccess: () => queryClient.invalidateQueries(['data'])
	});

	const onSubmit = (edited: INewItem) => {
		handleEdit(edited);
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
			<EditIcon
				onClick={() => setOpen(true)}
				sx={{
					cursor: 'pointer',
					marginLeft: '5px'
				}}
			/>

			<Modal
				keepMounted
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='keep-mounted-modal-title'
				aria-describedby='keep-mounted-modal-description'
			>
				<>
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
							defaultValue={data?.companySignatureName}
							render={({ field: { onChange }, fieldState: { error } }) => (
								<TextField
									defaultValue={data?.companySignatureName}
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
							defaultValue={data?.documentName}
							render={({ field: { onChange }, fieldState: { error } }) => (
								<TextField
									defaultValue={data?.documentName}
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
							defaultValue={data?.documentStatus}
							render={({ field: { onChange }, fieldState: { error } }) => (
								<TextField
									defaultValue={data?.documentStatus}
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
							defaultValue={data?.documentType}
							render={({ field: { onChange }, fieldState: { error } }) => (
								<TextField
									defaultValue={data?.documentType}
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
							defaultValue={data?.employeeNumber}
							render={({ field: { onChange }, fieldState: { error } }) => (
								<TextField
									defaultValue={data?.employeeNumber}
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
							defaultValue={data?.employeeSignatureName}
							render={({ field: { onChange }, fieldState: { error } }) => (
								<TextField
									defaultValue={data?.employeeSignatureName}
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
							{isLoading ? <Loading color='inherit' /> : 'Редактировать'}
						</Button>
					</Box>
				</>
			</Modal>
		</div>
	);
});
