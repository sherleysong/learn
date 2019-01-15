const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		'index': './src/index.js',
		'sudoku/index': './src/sudoku/index.js',
		'box/index': './src/box/index.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	plugins: [
    new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin("style.css"),
		new HtmlWebpackPlugin({
			filename: 'index.html', //输出的html路径  
			template: './src/index.html', //html模板路径  
			//inject : 'head',  //js文件在head中，若为body则在body中  
			inject: true,
			title: 'index - home Page ',
			chunks: ['./src/index']
		}),
		new HtmlWebpackPlugin({
			filename: 'sudoku/index.html', //输出的html路径  
			template: './src/sudoku/index.html', //html模板路径  
			//inject : 'head',  //js文件在head中，若为body则在body中  
			inject: true,
			title: 'sudoku',
			chunks: ['./src/sudoku/index']
		}),
		new HtmlWebpackPlugin({
			filename: 'box/index.html', //输出的html路径  
			template: './src/box/index.html', //html模板路径  
			//inject : 'head',  //js文件在head中，若为body则在body中  
			inject: true,
			title: 'box',
			chunks: ['./src/box/index']
		}),

		new CopyWebpackPlugin([{
			from: './src/static' , to: path._dirname
		}, ])
	],
	output: {
		filename: '[name].js',
		path: __dirname + '/dist'
	},
	module: {
		rules: [{
				test: /\.scss$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings 
				}, {
					loader: "css-loader" // translates CSS into CommonJS 
				}, {
					loader: "sass-loader" // compiles Sass to CSS 
				}]
			},

			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	}
};