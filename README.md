# 🎓 Course Management Frontend

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-B73FE9?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

A modern and responsive frontend application for the Course Management System, built with React and TypeScript. This application provides an intuitive user interface for managing courses, classes, enrollments, and payments.

## 🚀 Features

- **User Interface**
  - Responsive design for all devices
  - Modern Material-UI components
  - Intuitive navigation
  - Real-time feedback
  - Loading states and error handling

- **Authentication**
  - Role-based access control
  - Secure token management
  - Session handling
  - Protected routes

- **Course Management**
  - Course listing and search
  - Course details view
  - Class scheduling
  - Course enrollment
  - Progress tracking

- **Payment Integration**
  - VNPay payment gateway
  - Payment status tracking
  - Transaction history
  - Secure payment flow

## 🛠️ Technical Stack

- **Frontend**
  - React 18
  - TypeScript
  - Material-UI
  - Vite
  - Axios for API calls

- **State Management**
  - React Context
  - Local Storage
  - Custom Hooks

- **Development Tools**
  - ESLint
  - TypeScript
  - Vite Dev Server
  - React DevTools

## 🎯 Project Goals

This frontend project was developed with the following objectives:
- Create a user-friendly course management interface
- Implement responsive and accessible design
- Ensure smooth user experience
- Provide real-time feedback
- Follow modern React best practices
- Maintain code quality and type safety

## 💻 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/course_management_frontend.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 📚 Key Components

### Authentication
- `AdminLogin` - Admin authentication
- `StudentLogin` - Student authentication
- `InstructorLogin` - Instructor authentication

### Course Management
- `CourseList` - Display and search courses
- `CourseDetails` - Course information and enrollment
- `ClassManagement` - Class scheduling and management

### User Management
- `UserProfile` - User information and settings
- `EnrollmentHistory` - Track course enrollments
- `PaymentHistory` - View payment transactions

## 📚 Learning Outcomes

Through this project, I have gained:
- Experience with React and TypeScript
- Understanding of Material-UI components
- State management techniques
- API integration with Axios
- Environment configuration
- Responsive design implementation
- Error handling and user feedback
- Performance optimization
- Code organization and structure

## 🔍 Future Improvements

- Implement real-time updates
- Add more interactive features
- Enhance form validation
- Improve error handling
- Add comprehensive testing
- Implement caching strategies
- Add analytics tracking
- Improve accessibility

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For any inquiries or feedback, please reach out to:
- Email: [leductin.ld@gmail.com](mailto:leductin.ld@gmail.com)
- GitHub: [leductinjl](https://github.com/leductinjl)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

#   c o u r s e f r o n t e n d   -   U i   d a n g   k y   k h o a   h o c 
 
 