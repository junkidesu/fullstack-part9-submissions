import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

const getAll = async () => {
    const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return response.data;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };
