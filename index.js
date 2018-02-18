let oracledb = require('oracledb');


// Get a non-pooled connection
oracledb.getConnection({
    user: 'db_siscon',
    password: '010203',
    connectString: 'localhost/xe'
}, function (err, connection) {

    if (err) {
        console.error(err.message);
        return;
    }

    connection.execute("select 1 value from dual", [], {outFormat: oracledb.OBJECT}, function (err, result) {
        if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
        }

        // console.log(result.metaData);
        console.log(result.rows);
        doRelease(connection);
    });
});

// Note: connections should always be released when not needed
function doRelease(connection) {
    connection.close(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}