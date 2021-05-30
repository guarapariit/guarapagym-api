var fs = require('fs')
var path = require('path')

console.log('Creating ormconfig.json...')
fs.copyFileSync(
  path.resolve(__dirname, 'ormconfig_dev.json'),
  path.resolve(__dirname, 'ormconfig.json')
)
