import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoadingProps {
	color?: 'inherit';
	height?: string;
	text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ color, height, text }) => (
	<Box
		sx={{
			display: 'flex',
			justifyContent: 'center',
			height: height,
			alignItems: 'center'
		}}
	>
		<CircularProgress color={color} />
		<span style={{ marginLeft: '6px' }}>{text}</span>
	</Box>
);
