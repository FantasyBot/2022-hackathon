import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import MyHotels from "./pages/MyHotels";
import RegisterOperator from "./pages/RegisterOperator";
import AddHotelPage from "./pages/AddHotelPage";
import SignupPage from "./pages/SignupPage";
import ReservationsPage from "./pages/ReservationsPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";

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
    path: "/profile/:username",
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
    path: "/product/:username/add-hotel",
    element: <AddHotelPage />,
  },
  {
    id: 8,
    path: "/signup",
    element: <SignupPage />,
  },
  {
    id: 9,
    path: "/profile/:username/reservations",
    element: <ReservationsPage />,
  },
  {
    id: 10,
    path: "/hotels/:hotelName",
    element: <HotelDetailsPage />,
  },
  {
    id: 100,
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
