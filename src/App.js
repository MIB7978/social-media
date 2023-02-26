import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar.jsx";
import { Left } from "./components/left/Left.jsx";
import { Right } from "./components/right/Right.jsx";
import { Home } from "./pages/home/Home.jsx";
import { Profile } from "./pages/profile/Profile.jsx";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
function App() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  console.log(darkMode);
  const Layout = () => {
    return (
      <div className={`theme-${!darkMode ? "light" : "dark"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Left />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Right />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
