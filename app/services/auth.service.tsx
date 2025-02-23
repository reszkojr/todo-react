import { clearAuthTokens, setAuthTokens } from "axios-jwt";
import { api } from "~/api";

interface LoginParams { 
    email: string;
    password: string;
}

interface RegisterParams {
    email: string;
    password: string;
    username: string;
}

export const register = async (params: RegisterParams): Promise<void> => {
    return await api.post('/api/register', params);
}

export const login = async (params: LoginParams): Promise<void> => {
    const response = await api.post('/api/login', params);

    setAuthTokens({
		accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
	});
}

export const logout = async () => await clearAuthTokens();