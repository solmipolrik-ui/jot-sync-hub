const API_BASE_URL = 'http://localhost:4000';

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  // Authentication
  async signup(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }

    return response.json();
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  }

  // Notes CRUD
  async getNotes(): Promise<Note[]> {
    const response = await fetch(`${API_BASE_URL}/home/notes`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }

    return response.json();
  }

  async createNote(title: string, content: string): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/home/notes`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }

    return response.json();
  }

  async updateNote(id: string, title: string, content: string): Promise<Note> {
    const response = await fetch(`${API_BASE_URL}/home/notes/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to update note');
    }

    return response.json();
  }

  async deleteNote(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/home/notes/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
  }
}

export const apiService = new ApiService();