import LayoutAdmin from "../pages/layouts/LayoutAdmin";
import LayoutBasic from "../pages/layouts/LayoutBasic";
import AdminHome from "../pages/admin";
import SignIn from "../pages/admin/SignIn";
import Contact from "../pages/Contact";
import Messages from "../pages/admin/Messages";
import Editorial from "../pages/Editorial";
import Fantasy from "../pages/Fantasy";
import Home from "../pages/Home";
import Portrait from "../pages/Portrait";
import Error404Admin from "../pages/admin/Error404Admin";
import Error404Client from "../pages/Error404Client";
import Users from "../pages/admin/Users";
import MenuWeb from "../components/admin/MenuWeb/MenuWeb";
import Images from "../pages/admin/Images";
import About from "../pages/admin/About";

const routesAdmin = [
  {
    path: "/admin",
    layout: LayoutAdmin,
    element: AdminHome
  },
  {
    path: "/admin/login",
    layout: LayoutAdmin,
    element: SignIn
  },
  {
    path: "/admin/users",
    layout: LayoutAdmin,
    element: Users
  },
  {
    path: "/admin/menu-web",
    layout: LayoutAdmin,
    element: MenuWeb
  },
  {
    path: "/admin/gallery",
    layout: LayoutAdmin,
    element: Images
  },
  {
    path: "/admin/about",
    layout: LayoutAdmin,
    element: About
  },
  {
    path: "/admin/contact",
    layout: LayoutAdmin,
    element: Messages
  },
  {
    path: "/admin/*",
    layout: LayoutAdmin,
    element: Error404Admin
  }
];

const routesClient = [
  {
    path: "/",
    layout: LayoutBasic,
    element: Home
  },
  {
    path: "/portrait",
    layout: LayoutBasic,
    element: Portrait
  },
  {
    path: "/editorial",
    layout: LayoutBasic,
    element: Editorial
  },
  {
    path: "/fantasy",
    layout: LayoutBasic,
    element: Fantasy
  },
  {
    path: "/contact",
    layout: LayoutBasic,
    element: Contact
  },
  {
    path: "/*",
    layout: LayoutBasic,
    element: Error404Client
  }
];
const routes = [...routesAdmin, ...routesClient];

export default routes;
