module logService {

    var sqlQueries = require('./sql.query');
    var sql = require('mssql');
    const connection = require('./connection.json');
    
    export function getLogs(req, res) {
        sql.connect(connection).then(function() {
            var request = new sql.Request();
            request.query(sqlQueries.selectLogsSql)
                .then(function (recordset) {
                    var data = recordset.map(function(x) {
                            return {
                                "id": x.RowNummber,
                                "date": x.Date,
                                "level": x.Level,
                                "message": x.Message,
                                "machineName": x.MachineName,
                                "userName": x.userName };
                        });
                    res.json(data);
                }).catch(function(err) {
                    console.log(err);
                });
        }).catch(function(err) {
            console.log(err);
        });    
    }
    
    export function getLogsByQuery(req, res) {
        // todo: how to map req.query on model?
        // var pageRequestModel = new pageModels.PageModel.PageRequestModel(req.query.pageNumber, req.query.pageSize);

        var pageNumber = parseInt(req.query.pageNumber);
        var pageSize = parseInt(req.query.pageSize);

        // todo: add validation logic

        sql.connect(connection).then(function() {
            var request = new sql.Request();
            request.multiple = true;

            request.input('pageNumber', sql.Int, pageNumber);
            request.input('pageSize', sql.Int, pageSize);

            var sqlMultipleQueries = sqlQueries.selectLogsWithPagingSql + ';' + sqlQueries.selectCountLogsSql;

            request.query(sqlMultipleQueries).then(function(recordset) {
                var logRecords = recordset[0];
                var logTotalCount = recordset[1][0];

                var logModels = logRecords.map(function(x) {
                    return {
                        "id": x.RowNummber,
                        "date": x.Date,
                        "level": x.Level,
                        "message": x.Message,
                        "machineName": x.MachineName,
                        "userName": x.userName
                    }}
                );
                var pagesTotal = logTotalCount.PagesTotal;

                var pageResponseModel = {
                    "pageNumber": pageNumber,
                    "pageSize": pageSize,
                    "pageTotal": pagesTotal
                };

                var logGridModel = {
                    "pageModel": pageResponseModel,
                    "logModels": logModels
                };

                res.json(logGridModel);
            }).catch(function(err) {
                console.log(err);
            });
        }).catch(function(err) {
            console.log(err);
        });
    }
}

export = logService;