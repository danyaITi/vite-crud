import $api from '../api/wrapper';
import { URLS } from '../constants/urls';
import { INewItem } from '../types/types';

export const useTable = () => {
	const fetchData = async () => {
		const { data } = await $api.get(URLS.GET);

		return data;
	};

	const createItem = async (item: INewItem) => {
		const { data } = await $api.post(URLS.POST, item);

		return data;
	};

	const deleteItem = async (id: string) => {
		const { data } = await $api.post(`${URLS.DELETE}/${id}`);

		return data;
	};

	const editItem = async (edited: INewItem, id: string | undefined) => {
		const { data } = await $api.post(`${URLS.PATCH}/${id}`, edited);

		return data;
	};

	return { fetchData, createItem, deleteItem, editItem };
};
