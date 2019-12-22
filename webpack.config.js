// var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // entry: path.join(__dirname, 'src'),
    entry: {
        entry: './src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'index.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

};
