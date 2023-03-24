export interface AuthState {
	isAuth: boolean;
	status: string | null;
}

export enum authStatus {
	ERROR = 'error',
	SUCCESS = 'success',
	LOADING = 'loading',
	SERVER_ERR = 'serverError'
}
