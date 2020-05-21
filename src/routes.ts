import HomeScreen from "./page/HomeScreen";
import ListScreen from "./page/ListScreen";
import DetailScreen from "./page/DetailScreen";

const routerConfig = [
  {
    alias: '/index.html',
    path: "/",
    // component: HomeScreen,
    redirect: '/home/'
  },
  {
    path: "/home/",
    component: HomeScreen
  },
  {
    path: "/list/",
    component: ListScreen,
  },
  {
    path: "/detail/",
    component: DetailScreen
  },
  // {
  //   path: '(.*)',
  //   component: HomeScreen
  // }
];
export default routerConfig;
