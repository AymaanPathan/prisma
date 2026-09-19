import { createBrowserRouter } from "react-router";
import { RegisterPage } from "./pages/RegisterPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
