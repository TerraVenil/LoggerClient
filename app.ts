// set up =============================================================
process.env.DEBUG = 'swagger:*,express:*';

var path                        = require('path');
import express                  = require('express');
var app                         = express();
var swaggerNodeExpress          = require("swagger-node-express");
var swaggerApp                  = swaggerNodeExpress.createNew(app);
var swaggerExpressMiddleware    = require('swagger-express-middleware');

import * as logService from './logService';

// configuration =============================================================

app.set('port', process.env.PORT || 3000);

swaggerApp.configureDeclaration("api", {
    description: "Operations with Logs",
    produces: ["application/json"]
});

swaggerApp.setApiInfo({
    title: "Swagger Logs Appliction",
    description: "This is a sample API of Logs server.",
    contact: "kosunix@gmail.com"
});

// routes =============================================================

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.use('/docs', express.static(path.join(__dirname, '/swagger-ui')));
app.use('/logs-schema.yaml', express.static(path.join(__dirname, '/logs-schema.yaml')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/app', express.static(path.join(__dirname, '/app')));
app.use('/assets', express.static(path.join(__dirname, '/assets')));

// listen (start app with node app.js) =============================================================

// todo: how to extract routes from closure?
swaggerExpressMiddleware(path.join(__dirname, 'logs-schema.yaml'), app, (err, middleware) => {

    app.use(
        middleware.metadata(),
        middleware.parseRequest(),
        middleware.validateRequest()
    );

    app.get('/api/v1/logs', (req, res) => {
        logService.getLogs(req, res);
    });

    app.get('/api/v1/logsByQuery', (req, res) => {
        logService.getLogsByQuery(req, res);
    });

    var port = app.get('port');
    app.listen(port, () => {
        console.log('The Logs application is now running at http://localhost:' + port);
    }); 
});