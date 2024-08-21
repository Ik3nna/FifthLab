import axios from 'axios';
const BASE_URL = 'https://randomuser.me/api/';

interface IQueryParams {
    page: number;
    results: number;
    gender?: string;
}

export const getUsers = async (query: IQueryParams) => {
    let url = `${BASE_URL}?results=${query.results}`;

    if (query.gender) {
        url += `&gender=${query.gender}`;
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


