import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { Routes, Route } from 'react-router-dom';

const routes = [
  {
    id: 1,
    element: <HomePage />,
    path: '/',
  },
  {
    id: 2,
    element: <LoginPage />,
    path: '/login',
  },
  {
    id: 3,
    element: <RegisterPage />,
    path: '/register',
  },
];


const AppRouter = () => {
  return (
    <Routes>
      {routes.map(r => <Route key={r.id} element={r.element} path={r.path} />)}
    </Routes>
  )
};


export default AppRouter;