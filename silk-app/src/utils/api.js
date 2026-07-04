const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || 'Server error')
  }
  return data
}

const login = async (credentials) => {
  return fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then(handleResponse)
}

const register = async (user) => {
  return fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then(handleResponse)
}

const getProfile = async (token) => {
  return fetch(`${API_BASE_URL}/api/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse)
}

const updateProfile = async (profileData, token) => {
  return fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  }).then(handleResponse)
}

const forgotPassword = async (email) => {
  return fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  }).then(handleResponse)
}

const resetPassword = async (token, password) => {
  return fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password }),
  }).then(handleResponse)
}

const fetchTasks = async (token, options = {}) => {
  const params = new URLSearchParams()
  if (options.search) params.set('search', options.search)
  if (options.status) params.set('status', options.status)
  if (options.priority) params.set('priority', options.priority)
  if (options.page) params.set('page', options.page)
  if (options.limit) params.set('limit', options.limit)

  const queryString = params.toString() ? `?${params.toString()}` : ''
  return fetch(`${API_BASE_URL}/api/tasks${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse)
}

const fetchTaskById = async (id, token) => {
  return fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse)
}

const fetchDashboardStats = async (token) => {
  return fetch(`${API_BASE_URL}/api/tasks/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse)
}

const createTask = async (task, token) => {
  return fetch(`${API_BASE_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  }).then(handleResponse)
}

const updateTask = async (id, taskData, token) => {
  return fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  }).then(handleResponse)
}

const deleteTask = async (id, token) => {
  return fetch(`${API_BASE_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse)
}

export {
  login,
  register,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  fetchTasks,
  fetchTaskById,
  fetchDashboardStats,
  createTask,
  updateTask,
  deleteTask,
}
