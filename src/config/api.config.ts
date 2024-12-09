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
      GET_BY_ID: (id: string) => `${API_BASE_URL}/api/admin/courses/${id}`,
      UPDATE: (id: string) => `${API_BASE_URL}/api/admin/courses/${id}`,
      DELETE: (id: string) => `${API_BASE_URL}/api/admin/courses/${id}`,
      AVAILABLE: `${API_BASE_URL}/api/admin/courses/available`,
    },
    CLASSES: {
      LIST: `${API_BASE_URL}/api/admin/classes`,
      CREATE: `${API_BASE_URL}/api/admin/classes`,
      GET_BY_ID: (id: string) => `${API_BASE_URL}/api/admin/classes/${id}`,
      UPDATE: (id: string) => `${API_BASE_URL}/api/admin/classes/${id}`,
      DELETE: (id: string) => `${API_BASE_URL}/api/admin/classes/${id}`,
      GET_INSTRUCTORS: `${API_BASE_URL}/api/admin/classes/instructors`,
      GET_AVAILABLE_COURSES: `${API_BASE_URL}/api/admin/classes/available-courses`,
      STATS: {
        SUMMARY: `${API_BASE_URL}/api/admin/classes/stats/summary`,
        ENROLLMENT_COUNT: (id: string) => `${API_BASE_URL}/api/admin/classes/stats/enrollment-count/${id}`,
        LESSON_PROGRESS: (id: string) => `${API_BASE_URL}/api/admin/classes/stats/lesson-progress/${id}`,
        ANNOUNCEMENT_COUNT: (id: string) => `${API_BASE_URL}/api/admin/classes/stats/announcement-count/${id}`,
      }
    }
  },
  AUTH: {
    STUDENT: {
      LOGIN: `${API_BASE_URL}/api/auth/student/login`,
      REGISTER: `${API_BASE_URL}/api/auth/student/register`,
    },
    INSTRUCTOR: {
      LOGIN: `${API_BASE_URL}/api/auth/instructor/login`,
    }
  },
  INSTRUCTOR: {
    PROFILE: {
      GET_CURRENT: `${API_BASE_URL}/api/instructors/me`,
      UPDATE: (id: string) => `${API_BASE_URL}/api/instructors/${id}`,
    },
    ACHIEVEMENTS: {
      LIST: (instructorId: string) => `${API_BASE_URL}/api/instructors/${instructorId}/achievements`,
      CREATE: (instructorId: string) => `${API_BASE_URL}/api/instructors/${instructorId}/achievements`,
      UPDATE: (instructorId: string, achievementId: string) => 
        `${API_BASE_URL}/api/instructors/${instructorId}/achievements/${achievementId}`,
      DELETE: (instructorId: string, achievementId: string) => 
        `${API_BASE_URL}/api/instructors/${instructorId}/achievements/${achievementId}`,
    },
    CERTIFICATES: {
      LIST: (instructorId: string) => `${API_BASE_URL}/api/instructors/${instructorId}/certificates`,
      CREATE: (instructorId: string) => `${API_BASE_URL}/api/instructors/${instructorId}/certificates`,
      UPDATE: (instructorId: string, certificateId: string) => 
        `${API_BASE_URL}/api/instructors/${instructorId}/certificates/${certificateId}`,
      DELETE: (instructorId: string, certificateId: string) => 
        `${API_BASE_URL}/api/instructors/${instructorId}/certificates/${certificateId}`,
    },
    WORK_HISTORY: {
      LIST: (instructorId: string) => `${API_BASE_URL}/api/instructors/${instructorId}/work-history`,
      CREATE: (instructorId: string) => `${API_BASE_URL}/api/instructors/${instructorId}/work-history`,
      UPDATE: (instructorId: string, historyId: string) => 
        `${API_BASE_URL}/api/instructors/${instructorId}/work-history/${historyId}`,
      DELETE: (instructorId: string, historyId: string) => 
        `${API_BASE_URL}/api/instructors/${instructorId}/work-history/${historyId}`,
    }
  }
}; 