export const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  ADMIN: {
    LOGIN: `${API_BASE_URL}/api/admin/auth/login`,
    LOGOUT: `${API_BASE_URL}/api/admin/auth/logout`,
    PROFILE: `${API_BASE_URL}/api/admin/profile`,
    USERS: {
      LIST: `${API_BASE_URL}/api/admin/users`,
      CREATE: `${API_BASE_URL}/api/admin/users`,
      UPDATE: (id: string) => `${API_BASE_URL}/api/admin/users/${id}`,
      DELETE: (id: string) => `${API_BASE_URL}/api/admin/users/${id}`,
    },
    COURSES: {
      LIST: `${API_BASE_URL}/api/admin/courses`,
      CREATE: `${API_BASE_URL}/api/admin/courses`,
      UPDATE: (id: string) => `${API_BASE_URL}/api/admin/courses/${id}`,
      DELETE: (id: string) => `${API_BASE_URL}/api/admin/courses/${id}`,
      GET_BY_ID: (id: string) => `${API_BASE_URL}/api/admin/courses/${id}`,
      REQUESTS: {
        LIST: `${API_BASE_URL}/api/admin/course-requests`,
        UPDATE_STATUS: (id: string) => `${API_BASE_URL}/api/admin/course-requests/${id}/status`
      }
    }
  }
}; 