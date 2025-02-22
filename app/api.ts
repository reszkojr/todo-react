import { type IAuthTokens, type TokenRefreshRequest, applyAuthTokenInterceptor, getBrowserLocalStorage } from 'axios-jwt';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({ baseURL: API_URL });

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
	const response = await axios.post(`${API_URL}/api/refresh-token`, { token: refreshToken });

	return response.data.access_token;
};

const getStorage = getBrowserLocalStorage;

applyAuthTokenInterceptor(api, { requestRefresh, getStorage, header: 'Authorization', headerPrefix: 'Bearer ' });
