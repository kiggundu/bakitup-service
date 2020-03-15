const path = require('path')

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'bakitup-api',
    version: '0.0.1',
    description: 'The Bakitup Service API'
  },
  servers: [
    { url: 'http://localhost:3000' }
  ],
  apis: [path.join(__dirname, './src/**/**/*.ts')]
}
