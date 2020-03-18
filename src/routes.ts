import HomeScreen from "./page/HomeScreen";
import DetailScreen from "./page/DetailScreen";

const routerConfig = [
  {
    path: "/",
    component: HomeScreen
  },
  {
    path: "/detail/",
    component: DetailScreen
  },
  {
    path: '(.*)',
    component: HomeScreen
  }
];
export default routerConfig;
