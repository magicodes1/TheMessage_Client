const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 1234;

module.exports = {
	entry: './src/Index.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bunble.[contenthash].js',
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html',
			filename: 'index.html',
		}),
	],
	devServer: {
		port: port,
		historyApiFallback: true,
		static: [{ directory: path.join(__dirname, 'public'), watch: true }],
		open: false,
		hot: true,
	},
	mode:'development'
};
