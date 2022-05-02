const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  devtool: isProd ? 'source-map' : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../_dist'),
    publicPath: '/_dist/',
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      public: resolve('public'),
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/media/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './static/fonts/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        // use: ['vue-style-loader', 'css-loader'],
        use: isProd
          ? ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader'
          })
          : ['vue-style-loader', 'css-loader']
      },
    ],
  },
  plugins: isProd
    // make sure to add the plugin!
    ? [new ExtractTextPlugin({ filename: 'common.[chunkhash].css' }), new VueLoaderPlugin()]
    : [new VueLoaderPlugin()],
};
