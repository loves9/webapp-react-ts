const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require("customize-cra");
const path = require("path");

module.exports = override(
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
    //路径别名
    "@": path.resolve(__dirname, "src")
  }),
  (config, env) => {
    //暴露webpack的配置 config ,evn

    // 修改output path目录
    const paths = require("react-scripts/config/paths");
    paths.appBuild = path.join(path.dirname(paths.appBuild), "dist");
    config.output.path = path.join(path.dirname(config.output.path), "dist");

    return config;
  }
);

// module.exports = {
//   webpack: override(
//     fixBabelImports("import", {
//       libraryName: "antd",
//       libraryDirectory: "es",
//       style: true
//     }),
//     addLessLoader({
//       javascriptEnabled: true,
//       modifyVars: { "@primary-color": "#298ccf" }
//     }),
//     addWebpackAlias({
//       //路径别名
//       "@": path.resolve(__dirname, "src")
//     }),
//     (config, env) => {
//       //暴露webpack的配置 config ,evn

//       return config;
//     }
//   ),

//   publicPath: "./",
//   lintOnSave: false,
//   outputDir: "dist/www"
// };
