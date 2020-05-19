const {
  override,
  overrideDevServer,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require("customize-cra");
const path = require("path");
const fse = require("fs-extra");

function resolvePath(dir) {
  return path.join(__dirname, '.', dir)
}

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

let copyConfig = function({ origin, target }) {
  return new Promise((resolve, reject) => {
    try {
      fse.copySync(
        path.join(origin, "plugin.properties"),
        path.join(target, "plugin.properties")
      );
      fse.copySync(
        path.join(origin, "config.properties"),
        path.join(target, "www", "config.properties")
      );
      resolve("successfully");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd-mobile",
      libraryDirectory: "es",
      style: true
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { "brand-primary": "#298ccf" }
    }),
    addWebpackAlias({
      // 路径别名
      "@": resolvePath("src"),
      "api": resolvePath("src/page/api"),
      ["page"]: path.resolve(__dirname, "src/page"),
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

        // TODO: 延时拷贝可能有风险
        // setTimeout(() => {
        //   copyConfig({
        //     origin: process.cwd(),
        //     target: path.join(process.cwd(), "dist")
        //   }).then(e => {
        //     console.log("copyConfig：", e);
        //   });
        // }, 3000);

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

      // while (1) {

      // }
      return config;
    }
  )
};
