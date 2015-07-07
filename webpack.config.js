var webpack = require('webpack');
module.exports = {
    entry: [
      "./public/source/bootstrapper.jsx"
    ],
    output: {
        path: __dirname + '/public/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx{0,1}$/, loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]
};
