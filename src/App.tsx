import React from "react";
// import logo from "./logo.svg";
import "./App.css";

// import Hello from "./page/component/Hello";
// import { Button } from "antd";

import routerConfig from "./routes";

// Import F7 Bundle
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import F7-React Plugin
import Framework7React, { App, View } from 'framework7-react';



// Init F7-React Plugin
Framework7.use(Framework7React);

// import { App, View } from "framework7-react";

const ReactApp: React.FC = () => {
  return (
    <App params={f7params}>
      {/* initial page is specified in routes.js */}
      <View main url="/" />
    </App>
  );
};

const f7params = {
  // Array with app routes
  routes: routerConfig,
  // App Name
  name: "My App",
  // App id
  id: "com.myapp.test"
  // ...
};

export default ReactApp;

// export default () => (
//   // Main Framework7 App component where we pass Framework7 params
//   <App params={f7params}>
//     {/* Your main view, should have "main" prop */}
//     <View main>
//       {/*  Initial Page */}
//       <Page>
//         {/* Top Navbar */}
//         <Navbar title="Awesome App"></Navbar>
//         {/* Toolbar */}
//         <Toolbar bottom>
//           <Link>Link 1</Link>
//           <Link>Link 2</Link>
//         </Toolbar>
//         {/* Page Content */}
//         <p>Page content goes here</p>
//         <Link href="/detail/">About App</Link>
//       </Page>
//     </View>
//   </App>
// );
