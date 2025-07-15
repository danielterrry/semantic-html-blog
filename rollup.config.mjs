import json from "@rollup/plugin-json";

export default {
  input: "src/js/main.js",
  output: {
    file: "dist/static/js/bundle.js",
    format: "esm",
  },
  plugins: [json()],
};
