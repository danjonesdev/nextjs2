const routes = require('next-routes')

module.exports = routes()
.add('index', '/')
.add('category', '/category/:uid')
.add('article', '/article/:uid')
.add('notfound', '/*')
