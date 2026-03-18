import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import "./features/shared/styles/global.scss";
import { AuthContextProvider } from "./features/auth/auth.context";

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
