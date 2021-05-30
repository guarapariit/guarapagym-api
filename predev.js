const fs = require('fs')
const path = require('path')

console.log('Creating ormconfig.json...')
fs.copyFileSync(
  path.resolve(__dirname, 'ormconfig_dev.json'),
  path.resolve(__dirname, 'ormconfig.json'),
  { override: true }
)
