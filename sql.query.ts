export const selectTop5LogsSql = 'SELECT TOP 5 * FROM Log';

export const selectLogsSql = 'SELECT * FROM Log';

export const selectCountLogsSql = 'SELECT COUNT(*) as PagesTotal FROM Log';

export const selectLogsWithPagingSql = '' +
    'DECLARE @RowStart INT, @RowEnd INT;' +
    '' +
    'SET @RowStart = (@pageNumber - 1) * @pageSize + 1;' +
    'SET @RowEnd = @pageNumber * @pageSize;' +
    '' +
    'WITH Logs AS' +
    '(' +
        'SELECT ROW_NUMBER() OVER (ORDER BY Date DESC) AS RowNummber,' +
        'Id, Date, Level, Message, MachineName, UserName FROM Log' +
    ')' +
    'SELECT * FROM Logs ' +
    'WHERE RowNummber ' +
    'BETWEEN @RowStart AND @RowEnd ORDER BY RowNummber';