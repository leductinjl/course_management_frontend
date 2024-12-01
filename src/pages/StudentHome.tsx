import React from 'react';
import styles from './StudentHome.module.css';

const StudentHome: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeText}>Welcome to the Home Page</h1>
    </div>
  );
};

export default StudentHome;
