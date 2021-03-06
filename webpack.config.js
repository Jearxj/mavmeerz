module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/src/dist',
    filename: 'bundle.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: __dirname + '/src/',
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-1', 'react']
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.css$/,
        exclude: /\.useable\.css$/, loader: "style!css"
      },
      {
        test: /\.useable\.css$/,
        loader: "style/useable!css"
      },
      // {
      //   test: /\.scss$/,
      //   loaders: ["style", "css", "sass"]
      // },
      // {
      //   test: /\.jpg$/,
      //   loader: 'file-loader'
      // },
      // {
      //   test:/\.(png|jpg)$/,
      //   loader: 'url?limit=25000'
      // }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './src/'
  }
};
