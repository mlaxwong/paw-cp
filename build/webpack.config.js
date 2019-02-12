'use strict'

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

let webpackConfig = []

require('./entries.js').forEach(e => {

  webpackConfig.push({
    mode: 'development',
    entry: e.entry,
    output: {
        path: path.resolve(__dirname, '../' + e.output.path),
        filename: e.output.filename.js,
        publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.resolve('src/assets'),
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [path.resolve('src/assets')],
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.js$/,
          use: [
              {
                  loader: 'babel-loader',
                  options: {
                      presets: ['es2015', 'stage-2']
                  }
              }
          ] 
        },
        {
          test: /\.vue$/,
          use: ['vue-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: e.output.filename.css,
              },
            },
            'extract-loader',
            'css-loader', 
            'sass-loader',
          ],
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
    ]
  })
})

module.exports = webpackConfig