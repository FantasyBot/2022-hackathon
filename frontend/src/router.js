import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import MyHotels from './pages/MyHotels';

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
  {
    id: 4,
    path: '/profile',
    element: <ProfilePage />
  },
  {
    id: 5,
    path: '/profile/:username/myhotels',
    element: <MyHotels />
  },
  {
    id: 6,
    path: "*",
    element: <h1>404</h1>
  }
];

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(r => <Route key={r.id} element={r.element} path={r.path} />)}
    </Routes>
  )
};


export default AppRouter;