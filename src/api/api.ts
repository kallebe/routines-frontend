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

export async function registerUser(email: string, password: string, name: string) {
  try {
    const response = await api.post('/users', {
      user: { email: email, password: password, name: name }
    });
    
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao cadastrar usuário');
    }

    throw error;
  }
}

export async function getTasks() {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/tasks', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao buscar tarefas');
    }

    throw error;
  }
}

export async function createTask(title: string, duration: number, categoryId: string) {
  console.log('Creating task with:', { title, duration, categoryId });
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/tasks', {
      task: { title: title, duration: duration, category_id: categoryId }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao criar tarefa');
    }

    throw error;
  }
}

export async function getCategories() {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao buscar categorias');
    }

    throw error;
  }
}
