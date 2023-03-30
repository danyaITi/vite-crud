import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { memo } from 'react';
import { ItemTable } from 'types/types';

interface RowProps {
	data: ItemTable;
}

export const Row: React.FC<RowProps> = memo(({ data }) => {
	const {
		companySigDate,
		companySignatureName,
		documentName,
		documentStatus,
		documentType,
		employeeNumber,
		employeeSigDate,
		employeeSignatureName
	} = data;

	return (
		<TableRow hover tabIndex={-1}>
			<TableCell>{companySigDate}</TableCell>
			<TableCell>{companySignatureName}</TableCell>
			<TableCell>{documentName}</TableCell>
			<TableCell>{documentStatus}</TableCell>
			<TableCell>{documentType}</TableCell>
			<TableCell>{employeeNumber}</TableCell>
			<TableCell>{employeeSigDate}</TableCell>
			<TableCell>{employeeSignatureName}</TableCell>
		</TableRow>
	);
});
