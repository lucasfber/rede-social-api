const httpServer = require('http');
const app = require('./config/express')();

httpServer.createServer(app).listen(app.get("port"), function() {
    console.log(`Server listening on port ${app.get('port')}`);
})

