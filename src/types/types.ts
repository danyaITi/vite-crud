interface IUser {
	username: string;
	password: string;
}

interface ItemTable {
	companySigDate: string;
	companySignatureName: string;
	documentName: string;
	documentStatus: string;
	documentType: string;
	employeeNumber: string;
	employeeSigDate: string;
	employeeSignatureName: string;
	id: string;
}

interface IDataTable {
	data: ItemTable[];
}

export type INewItem = Omit<ItemTable, 'id'>;
export type { IUser };
export type { ItemTable };
export type { IDataTable };
