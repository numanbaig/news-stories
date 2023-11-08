import Cookies from "universal-cookie";
import ProtectedRoute from "./protectedRoute";
import PublicRoutes from "./publicRoutes";

const AppRoutes = () => {
  const cookies = new Cookies(null, { path: "/" });
  const CookieAccesssToken = cookies.get("CookieAccesssToken");
  return CookieAccesssToken ? <ProtectedRoute /> : <PublicRoutes />;
};

export default AppRoutes;
