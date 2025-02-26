import { clearAuthTokens, setAuthTokens } from "axios-jwt";
import { api } from "~/api";

interface LoginParams { 
    email: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

interface RegisterParams {
    email: string;
    password: string;
    username: string;
}

export const register = async (params: RegisterParams): Promise<void> => {
    return await api.post('/api/register', params);
}

export const login = async (params: LoginParams): Promise<LoginResponse> => {
    const response = await api.post('/api/login', params);
    const { accessToken, refreshToken } = response.data;

    setAuthTokens({
		accessToken,
        refreshToken
	});

    return { accessToken, refreshToken };
}

export const logout = async () => await clearAuthTokens();