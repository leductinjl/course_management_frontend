import { VariantType } from 'notistack';

interface NotificationConfig {
  message: string;
  variant: VariantType;
}

export const showNotification = (enqueueSnackbar: any, config: NotificationConfig) => {
  enqueueSnackbar(config.message, {
    variant: config.variant,
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
    autoHideDuration: 3000
  });
};

export const ERROR_MESSAGES = {
  COURSE_HAS_CLASSES: 'Không thể xóa môn học này vì đang có lớp học liên kết',
  COURSE_HAS_ENROLLMENTS: 'Không thể xóa môn học này vì đang có sinh viên đăng ký học',
  COURSE_CODE_EXISTS: 'Mã môn học đã tồn tại',
  NETWORK_ERROR: 'Lỗi kết nối máy chủ',
  DELETE_COURSE_ERROR: 'Không thể xóa môn học vì còn tồn tại dữ liệu liên quan (lớp học/sinh viên đăng ký)',
  CLASS_HAS_ENROLLMENTS: 'Không thể xóa lớp học đã có học viên đăng ký',
  CLASS_HAS_LESSONS: 'Không thể xóa lớp học đã có bài học',
  CLASS_ALREADY_STARTED: 'Không thể xóa lớp học đã bắt đầu hoặc đã kết thúc',
  CLASS_NOT_FOUND: 'Không tìm thấy lớp học',
  CLASS_DELETE_ERROR: 'Không thể xóa lớp học do có dữ liệu liên quan',
  CLASS_UPDATE_NOT_ALLOWED: 'Chỉ có thể cập nhật lớp học chưa bắt đầu',
  CLASS_ALREADY_IN_PROGRESS: 'Không thể cập nhật lớp học đang diễn ra hoặc đã kết thúc',
  CLASS_UPDATE_ERROR: 'Lỗi khi cập nhật lớp học',
  USER_DELETE_ERROR: 'Không thể xóa người dùng do lỗi hệ thống',
  USER_CREATE_ERROR: 'Không thể tạo người dùng do lỗi hệ thống',
  USER_UPDATE_ERROR: 'Không thể cập nhật người dùng do lỗi hệ thống',
  INSTRUCTOR_HAS_CLASSES: 'Không thể xóa giảng viên này vì đang giảng dạy một hoặc nhiều lớp học',
  STUDENT_HAS_ENROLLMENTS: 'Không thể xóa học viên này vì đang tham gia một hoặc nhiều lớp học',
  EMAIL_EXISTS: 'Email đã tồn tại trong hệ thống',
}; 