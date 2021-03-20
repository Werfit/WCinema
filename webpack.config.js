const path = require('path')

module.exports = {
  entry: ['@babel/polyfill', './cinema/frontend/src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname + '/cinema/frontend/src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  }
}