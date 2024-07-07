import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import CheckEmail from "../pages/CheckEmail";
import CheckPassword from "../pages/CheckPassword";
import ManagePages from "../components/ManagePages";
import App from "../App";
import AuthLayouts from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: ":userId",
            element: <ManagePages />,
          },
        ],
      },
      {
        path: "register",
        element: (
          <AuthLayouts>
            <Register />
          </AuthLayouts>
        ),
      },
      {
        path: "email",
        element: (
          <AuthLayouts>
            <CheckEmail />
          </AuthLayouts>
        ),
      },
      {
        path: "password",
        element: (
          <AuthLayouts>
            <CheckPassword />
          </AuthLayouts>
        ),
      },
    ],
  },
]);

export default router;
