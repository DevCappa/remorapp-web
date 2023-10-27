import { Home, Profile, SignIn } from "@/pages";
import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

export const routes = [
  {
    name: "",
    path: "/home",
    element: <Home />,
  },
  {
    name: "",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "",
    path: "/sign-in",
    element: <SignIn />,
  },
];

export default routes;
