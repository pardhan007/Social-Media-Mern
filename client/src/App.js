import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import HomePage from "scenes/homePage/HomePage.js";
import LoginPage from "scenes/loginPage/LoginPage.js";
import ProfilePage from "scenes/profilePage/ProfilePage.js";
import { themeSettings } from "theme";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Route>
    )
  );

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
};

export default App;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <LoginPage />,
//   },
//   {
//     path: "/home",
//     element: <HomePage />,
//   },
//   {
//     path: "/profile/:userId",
//     element: <ProfilePage />,
//   },
// ]);
