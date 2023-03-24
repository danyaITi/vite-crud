import { ItemTable } from '../../types/types';

export interface ModalState {
	isModalCreate: boolean;
	isModalEdit: boolean;
	editedItem: ItemTable | undefined;
}
