import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export const Error: React.FC = () => (
	<Stack sx={{ width: '100%' }} spacing={2}>
		<Alert severity='error'>
			<AlertTitle>Error</AlertTitle>
			<strong>Ошибка в получении данных! Попробуйте позже</strong>
		</Alert>
	</Stack>
);
