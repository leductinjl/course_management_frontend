import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.errorText}>404</h1>
      <p className={styles.description}>Trang bạn đang tìm kiếm không tồn tại</p>
      <Link to="/" className={styles.homeButton}>
        Về Trang Chủ
      </Link>
    </div>
  );
};

export default NotFound;
