import path from "node:path";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const config: webpack.Configuration = {
    mode: "none",
    entry: "./src/index.ts",
    module: {
      rules: [
        {
          test: /\.([cm]?ts|tsx)$/,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader",
              options: {
                  presets: [
                      '@babel/preset-env',
                      ['@babel/preset-react', {runtime: "automatic", development: argv.mode !== "production"}],
                      '@babel/preset-typescript'
                  ]
              }
          }
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ],
    },
    resolve: {
      fullySpecified: true,
      extensions: [".tsx", ".ts", ".js"],
      extensionAlias: {
          ".js": [".js", ".ts"],
          ".cjs": [".cjs", ".cts"],
          ".mjs": [".mjs", ".mts"]
      }
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      library: {
          name: "myComponents",
          type: "umd"
      }
    },
    devtool: argv.mode === "production"? "source-map" : "inline-source-map"
  };
  return config;
}