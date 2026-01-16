import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Error from './Pages/Error/Error'
import Register from "./Pages/Auth/Register";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/Store";
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer, toast } from 'react-toastify';
import PrivateRouter from "./guard/PrivateRouter";
import Login from "./Pages/Auth/Login";
import Profile from "./Pages/Profile";
import Project from "./Pages/Project";
import NotFound from "./Pages/Error/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <App />
      </PrivateRouter >),
    errorElement: <Error />,
    children: [
      {
        path: '/Profile',
        element: <Profile />
      },
      {
        path: '/Project',
        element: <Project />
      }
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },

  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </PersistGate>
  </Provider>
);
