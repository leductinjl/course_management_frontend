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
      GET_CURRENT: `${API_BASE_URL}/api/instructor/profile`,
      UPDATE: (id: string) => `${API_BASE_URL}/api/instructor/${id}`,
    },
    ACHIEVEMENTS: {
      LIST: (instructor_id: string) => `${API_BASE_URL}/api/instructor/${instructor_id}/achievements`,
      CREATE: (instructor_id: string) => `${API_BASE_URL}/api/instructor/${instructor_id}/achievements`,
      UPDATE: (instructor_id: string, achievementId: string) => 
        `${API_BASE_URL}/api/instructor/${instructor_id}/achievements/${achievementId}`,
      DELETE: (instructor_id: string, achievementId: string) => 
        `${API_BASE_URL}/api/instructor/${instructor_id}/achievements/${achievementId}`,
    },
    CERTIFICATES: {
      LIST: (instructor_id: string) => `${API_BASE_URL}/api/instructor/${instructor_id}/certificates`,
      CREATE: (instructor_id: string) => `${API_BASE_URL}/api/instructor/${instructor_id}/certificates`,
      UPDATE: (instructor_id: string, certificateId: string) => 
        `${API_BASE_URL}/api/instructor/${instructor_id}/certificates/${certificateId}`,
      DELETE: (instructor_id: string, certificateId: string) => 
        `${API_BASE_URL}/api/instructor/${instructor_id}/certificates/${certificateId}`,
    },
    WORK_HISTORY: {
      LIST: (instructor_id: string) => `${API_BASE_URL}/api/instructor/${instructor_id}/work-history`,
      CREATE: (instructor_id: string) => `${API_BASE_URL}/api/instructor/${instructor_id}/work-history`,
      UPDATE: (instructor_id: string, historyId: string) => 
        `${API_BASE_URL}/api/instructor/${instructor_id}/work-history/${historyId}`,
      DELETE: (instructor_id: string, historyId: string) => 
        `${API_BASE_URL}/api/instructor/${instructor_id}/work-history/${historyId}`,
    },
    TEACHING: {
      SCHEDULE: `${API_BASE_URL}/api/instructor/teaching/schedule`,
      GET_COURSES: `${API_BASE_URL}/api/instructor/teaching/courses`,
      CLASS_STATUS: (class_id: string) => 
        `${API_BASE_URL}/api/instructor/teaching/classes/${class_id}/status`,
    },
    COURSES: '/instructor/courses',
  },

  
  STUDENT: {
    PROFILE: {
      GET_CURRENT: `${API_BASE_URL}/api/student/profile`,
      UPDATE: (id: string) => `${API_BASE_URL}/api/student/${id}`,
    },
    COURSES: {
      AVAILABLE: `${API_BASE_URL}/api/student/courses/available`,
      SEARCH: `${API_BASE_URL}/api/student/courses/available`,
    },
    CLASSES: {
      AVAILABLE: (course_id: string) => 
        `${API_BASE_URL}/api/student/classes/available/${course_id}`,
    },
    ENROLLMENTS: {
      ENROLL: `${API_BASE_URL}/api/student/enrollments/enroll`,
      UNENROLL: (id: string) => `${API_BASE_URL}/api/student/enrollments/unenroll/${id}`,
      MY_ENROLLMENTS: `${API_BASE_URL}/api/student/enrollments/my-enrollments`,
      HISTORY: `${API_BASE_URL}/api/student/enrollments/history`
    }
  }
}; 