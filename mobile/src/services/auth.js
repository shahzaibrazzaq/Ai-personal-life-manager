import api, { setAuthToken } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    const token = response.data.access_token;
    await AsyncStorage.setItem('token', token);
    setAuthToken(token);
    return response.data;
};

export const logout = async () => {
    await AsyncStorage.removeItem('token');
    setAuthToken(null);
};

export const loadUser = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        setAuthToken(token);
        try {
            const res = await api.get('/auth/me');
            return res.data;
        } catch (err) {
            return null;
        }
    }
    return null;
}
