import * as path from "path";

const webpackConfig = {
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },
};

export default webpackConfig;