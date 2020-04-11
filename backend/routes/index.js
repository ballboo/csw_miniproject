let routes = {}

routes.test = require('./api/test')
routes.login = require('./api/login')
routes.getStudents = require('./api/getStudents')

module.exports = routes
