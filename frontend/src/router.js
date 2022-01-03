import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import MyHotels from "./pages/MyHotels";
import RegisterOperator from "./pages/RegisterOperator";
import AddHotel from "./pages/AddHotel";
import SignupPage from './pages/SignupPage';

import { Routes, Route } from "react-router-dom";

const routes = [
  {
    id: 1,
    element: <HomePage />,
    path: "/",
  },
  {
    id: 2,
    element: <LoginPage />,
    path: "/login",
  },
  {
    id: 3,
    element: <RegisterPage />,
    path: "/register",
  },
  {
    id: 4,
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    id: 5,
    path: "/register/operator",
    element: <RegisterOperator />,
  },
  {
    id: 6,
    path: "/profile/:username/myhotels",
    element: <MyHotels />,
  },
  {
    id: 7,
    path: "/profile/:username/addhotel",
    element: <AddHotel />,
  },
  {
    id: 8,
    path: '/signup',
    element: <SignupPage />,
  },
  {
    id: 9,
    path: "*",
    element: <h1>404</h1>,
  },
];

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((r) => (
        <Route key={r.id} element={r.element} path={r.path} />
      ))}
    </Routes>
  );
};

export default AppRouter;
