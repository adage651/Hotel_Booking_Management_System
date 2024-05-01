import * as path from "path";
import { Configuration } from "webpack";

const webpackConfig: Configuration = {
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
    },
  },
};

export default webpackConfig;