import { Home } from "../pages/home/Home";
import Test from "../pages/test/Test";
import { routeContants } from "../utils/RouteConstants";

export const PublicRoutes = [
  { path: routeContants.DEFAULT, Component: <Home /> },
  { path: routeContants.HOME, Component: <Home /> },
  { path: routeContants.test, Component: <Test /> },
];
