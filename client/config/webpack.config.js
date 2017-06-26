const webpack = require("webpack");
const path = require ('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
	entry: {
    bundle: [ path.join(__dirname, "../src/index.js") ]
  },
	output: {
		path: path.join(__dirname, "../dist"),
		filename: "[name].js",
	}, 
	devServer: {
		compress: true, // enable gzip compression (faster compression).
		historyApiFallback: true, // enable for react router
		stats: "minimal", // shows errors
		proxy: {
			"/api": "http://localhost:3000" // Forward request to local dev server without errors
		}
	},
	module: {
		rules: [
      {
        test: /\.(js|jsx)$/, // Tests for .js or .jsx
        exclude: /node_modules/, // Ignores node modules with javascript
        loader: "babel-loader", // Transpiles code from es6/7 and spits out es5
        options: {
          presets: ["env", "react"], // Based on browser enviornment, transpile accordingly
          cacheDirectory: true //touch
        }	
      }
		]
	},
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    })
  ]
};

