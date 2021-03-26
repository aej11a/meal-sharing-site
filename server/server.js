var express = require('express')
var app = express()

app.get('/sample', require('./api/sample'))

app.listen(3000, () => {
    console.log('Server running on port 3000')
})
