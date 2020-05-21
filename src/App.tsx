import React from "react";
// import "./App.css";
import routerConfig from "./routes";
// Import F7 Bundle
// import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import F7-React Plugin
import { App, View } from "framework7-react";

// Init F7-React Plugin
// Framework7.use(Framework7React);

// import HomeScreen from "./page/HomeScreen";

const f7params = {
  root: "#root",
  // Array with app routes
  routes: routerConfig,
  // App id
  id: "io.react.webapp", // App bundle ID
  name: "react-ts", // App name
  theme: "ios", // Automatic theme detection
  // App routes
  view: {
    stackPages: true,
    pushState: true,
    // pushStateSeparator: "#"
  },
};

// const ReactApp: React.FC = () => {
//   return (
//     <App params={f7params}>
//       {/* initial page is specified in routes.js */}
//       <View main url="/"></View>
//     </App>
//   );
// };

class ReactApp extends React.Component {
  // constructor(parameters) {}

  componentDidMount() {
    console.log("App Mounted");
  }

  render() {
    return (
      <App params={f7params}>
        {/* initial page is specified in routes.js */}
        <View main url="/home/">
          {/* <HomeScreen></HomeScreen> */}
        </View>
      </App>

      // <View routes={routerConfig} url="/home/"></View>
    );
  }
}

export default ReactApp;
