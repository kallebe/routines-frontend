import type { TaskRoutine } from '@/interfaces/task_routine';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ------------------- Sessions ------------------- //

export async function login(email: string, password: string) {
  try {
    const response = await api.post('/login', {
      user: { email: email, password: password }
    });
    
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Erro ao fazer login');
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
      throw new Error(error.response.data || 'Erro ao cadastrar usuário');
    }

    throw error;
  }
}

// ------------------- Tasks ------------------- //

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
      throw new Error(error.response.data || 'Erro ao buscar tarefas');
    }

    throw error;
  }
}

export async function createTask(title: string, duration: number, categoryId: string) {
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
      throw new Error(error.response.data || 'Erro ao criar tarefa');
    }

    throw error;
  }
}

export async function deleteTask(taskId: number) {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Erro ao deletar tarefa');
    }

    throw error;
  }
}

// ------------------- Routines ------------------- //

export async function getRoutines() {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/user_routines', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Erro ao buscar rotinas');
    }

    throw error;
  }
}

export async function createRoutine(title: string, days_of_week: string, task_routines: TaskRoutine[]) {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/user_routines', {
      user_routine: { title: title, days_of_week: days_of_week, task_routines_attributes: task_routines }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Erro ao criar rotina');
    }

    throw error;
  }
}

export async function deleteRoutine(routineId: number) {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/user_routines/${routineId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Erro ao deletar rotina');
    }

    throw error;
  }
}

// ------------------- Categories ------------------- //

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
      throw new Error(error.response.data || 'Erro ao buscar categorias');
    }

    throw error;
  }
}

export async function createCategory(title: string, color: string) {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/categories', {
      category: { title: title, color: color }
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Erro ao criar categoria');
    }

    throw error;
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data || 'Erro ao deletar categoria');
    }

    throw error;
  }
}
