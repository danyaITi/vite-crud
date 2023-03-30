import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Fragment } from 'react';
import { useTable } from 'hooks/useTable';
import { IDataTable } from 'types/types';

import { Loading } from 'components/Loading';
import { Error } from 'components/Error';
import { ModalCreate } from 'components/ModalCreate';
import { ModalEdit } from 'components/ModalEdit';
import { Row } from 'components/Row';

const columns = [
	'companySigDate',
	'companySignatureName',
	'documentName',
	'documentStatus',
	'documentType',
	'employeeNumber',
	'employeeSigDate',
	'employeeSignatureName'
];

const style = {
	display: 'flex',
	marginLeft: '10px',
	marginTop: '10px'
};

export const TableComponent: React.FC = () => {
	// custom hooks
	const { fetchData, deleteItem } = useTable();

	//react-query
	const queryClient = useQueryClient();

	//get
	const { data, isLoading, isError } = useQuery<IDataTable>('data', fetchData, {
		keepPreviousData: true,
		refetchOnWindowFocus: false
	});

	//delete
	const { mutate: handleDelete, isLoading: deleteLoading } = useMutation(
		(id: string) => deleteItem(id),
		{
			onSuccess: () => queryClient.invalidateQueries(['data'])
		}
	);

	if (isLoading) {
		return (
			<>
				<Loading height='100vh' text='Загрузка...' />;
			</>
		);
	}

	if (isError) {
		return <Error />;
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<ModalCreate />
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table
					stickyHeader
					aria-label='sticky table'
					className={deleteLoading ? 'disabled' : ''}
				>
					<TableHead>
						<TableRow>
							{columns.map((item, idx) => (
								<TableCell key={idx}>{item}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.data
							.map(item => (
								<Fragment key={item.id}>
									<>
										<div style={style}>
											<DeleteOutlinedIcon
												sx={{ cursor: 'pointer' }}
												onClick={() => handleDelete(item.id)}
											/>
											<ModalEdit data={item} />
										</div>
										<Row data={item} />
									</>
								</Fragment>
							))
							.reverse()}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};
