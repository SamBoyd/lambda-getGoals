exports.handler = (event, context, callback) =>
{

    const conn = "pg://dev:sunmicrordssp1der@micrords.ckeww55ptuog.eu-west-1.rds.amazonaws.com:5432/mydb";

    const query = "select array_agg(row_to_json(t)) FROM (select role, array_agg(goal) as goals from goals group by role) t";

    const {Client} = require('pg');

    const clientParams = {
        user: "dev",
        password: "sunmicrordssp1der",
        database: "mydb",
        port: 5432,
        host: "micrords.ckeww55ptuog.eu-west-1.rds.amazonaws.com"
    };
    const client = new Client(clientParams);

    client.connect()
        .then(() => {
            client.query(query)
                .then((res, err) => {
                    // console.log(JSON.stringify(res.rows[0].row_to_json));
                    const response = {
                        "statusCode": 200,
                        "headers": {
                            "content-type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        "body": JSON.stringify(res.rows[0].array_agggi)
                    };

                    client.end();

                    callback(null, response)
                 })
        }).catch(() => {
            callback(null, null)
        })
};