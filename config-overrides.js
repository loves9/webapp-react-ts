const {
  override,
  overrideDevServer,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require("customize-cra");
const path = require("path");

// module.exports = override(
//   fixBabelImports("import", {
//     libraryName: "antd",
//     libraryDirectory: "es",
//     style: true
//   }),
//   addLessLoader({
//     javascriptEnabled: true,
//     modifyVars: { "@primary-color": "#298ccf" }
//   }),
//   addWebpackAlias({
//     // 路径别名
//     "@": path.resolve(__dirname, "src")
//   }),
//   (config, env) => {
//     // 暴露webpack的配置 config ,evn

//     // 修改output path目录
//     const paths = require("react-scripts/config/paths");
//     if (process.env.NODE_ENV === "production") {
//       paths.appBuild = path.join(path.dirname(paths.appBuild), "dist/www");
//       config.output.path = path.join(
//         path.dirname(config.output.path),
//         "dist/www"
//       );
//     }
//     else if (process.env.NODE_ENV === "development") {
//       // config.devServer = {
//       //   port: 8080 || process.env.PORT
//       // }
//     }

//     config.output.publicPath =
//       process.env.NODE_ENV === "production" ? "./" : "/";

//     console.log(config);

//     // while (1) {

//     // }

//     return config;
//   }
// );

module.exports = {
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#298ccf" }
    }),
    addWebpackAlias({
      // 路径别名
      "@": path.resolve(__dirname, "src")
    }),
    (config, env) => {
      // 暴露webpack的配置 config ,evn

      // 修改output path目录
      const paths = require("react-scripts/config/paths");
      if (process.env.NODE_ENV === "production") {
        paths.appBuild = path.join(path.dirname(paths.appBuild), "dist/www");
        config.output.path = path.join(
          path.dirname(config.output.path),
          "dist/www"
        );
      } else if (process.env.NODE_ENV === "development") {
        // config.devServer = {
        //   port: 8080 || process.env.PORT
        // }
      }

      config.output.publicPath =
        process.env.NODE_ENV === "production" ? "./" : "/";

      // console.log(config);

      // while (1) {

      // }

      return config;
    }
  ),
  devServer: overrideDevServer(
    // dev server plugin
    (config, env) => {
      config.port = process.env.PORT || 8080;

      console.log(config);

      // while (1) {

      // }
      return config;
    }
  )
};
