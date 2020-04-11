const packageJson = require('./package.json');
var app = require('./app')

const PORT = process.env.PORT || 8080


app.listen(PORT,() => { 
	console.log('API is running : '+ PORT)})

