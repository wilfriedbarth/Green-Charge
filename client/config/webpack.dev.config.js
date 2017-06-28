const webpack = require("webpack");
const path = require ('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
	devtool: "eval-source-map", // Processes slower but maps transpiling 
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
	      },
	      
	      {
	      	test: /\.scss$/,
	      	exclude: /node_modules/,
	      	use: [
	      		{
	      			loader: "style-loader",
	      			options: {
	      				sourceMap: true //enable debugging 	
	      			}
	      		},
	      		
	      		{
	      			loader: "css-loader",
	      			options: {
	      				sourceMap: true
	      			}
	      		},
	      		
	      		{
	      			loader: "sass-loader",
	      			options: {
	      				sourceMap: true	
	      			}
	      		}
	      	]
	      },

	      {
	      	loader: "file-loader",
	      	exclude: [
	      		/\.html$/,
	      		/\.(js|jsx)$/,
	      		/\.scss$/,
	      		/\.json$/,
	      		/\.bmp$/,
	      		/\.gif$/,
	      		/\.jpe?g$/,
	      		/\.svg$/,
	      		/\.png$/
	      	],
	      	options: {
	      		name: "[name].[ext]"
	      	}
	      },

	      {
	      	test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
	      	loader: "url-loader",
	      	options: {
	      		limit: 10000,
	      		name:"[name].[ext]"
	      	}
	      }
		]
	},
  plugins: [
    new webpack.EnvironmentPlugin({ // Will create a development evironment, but will pull itself out of production bundle.js
    	NODE_ENV: "development"
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    })
  ]
};

