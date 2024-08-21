import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SEED = import.meta.env.VITE_API_SEED;

interface IQueryParams {
    page: number;
    results: number;
    gender?: string;
}

export const getUsers = async (query: IQueryParams) => {
    let url = `${BASE_URL}?results=${query.results}`;

    if (query.gender) {
        url += `&gender=${query.gender}`;
    } else {
        url += `&seed=${SEED}`;
    }
    if (query.page) {
        url += `&page=${query.page}`;
    }

    try {
        const response = await axios.get(url);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}


