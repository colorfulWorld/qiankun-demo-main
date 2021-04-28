const path = require('path')
const packageName = require('./package.json').name
const env = require('./config')

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  }
}

module.exports = {
  assetsDir: 'static',
  publicPath: '/',
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'] = env
      return args
    })
  },
  configureWebpack: {
    externals: assetsCDN.externals,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        views: path.resolve(__dirname, 'src/views')
      }
    },
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  },
  devServer: {
    port: 80,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: '',
        ws: false,
        changeOrigin: true
      },
      '/bgs': {
        target: '',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
