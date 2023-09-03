import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login.tsx";
import { StoreProvider } from "./StoreContext.tsx";
import { Balance } from "./pages/Balance.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style/App.scss";
// import 'animate.css'
import { Page } from "./components/Page.tsx";

const router = createBrowserRouter([
  {
    errorElement: <div>Oops... Something went wrong!</div>,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Balance,
  },
]);

export function App() {
  return (
    <StoreProvider>
      <Page>
        <RouterProvider router={router} />
      </Page>
      <ToastContainer />
    </StoreProvider>
  );
}
