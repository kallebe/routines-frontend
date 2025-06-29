import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export async function login(email: string, password: string) {
  try {
    const response = await api.post('/login', {
      user: { email: email, password: password }
    });
    
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao fazer login');
    }

    throw error;
  }
}
