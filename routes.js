const routes = require('next-routes')

module.exports = routes()
.add('index', '/')
.add('category', '/category/:uid')
.add('blogpost', '/blog/:uid')
.add('notfound', '/*')
