const path = require('path')

exports.resolve = function resolve(dir) {
  return path.join(__dirname, "..", dir )
}

exports.APP_PATH = exports.resolve('src')

exports.DIST_PATH = exports.resolve('dist')

exports.NODE_MODULES = exports.resolve('node_modules')
