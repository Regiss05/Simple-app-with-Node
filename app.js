const express = require('express');
const app = express();
const morgan = require('morgan');
const { Pool } = require('pg');
require('dotenv').config();

let pool = new Pool();
const port = process.env.PORT;

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <form action="/info/get" method="GET">
            <input type="submit" value="GET">
        </form>
    </body>
    </html>
    `);
});

app.get('/info/get', (req, res) => {
    try {
        pool.connect(async (error, client, release) => {
            let resp = await client.query(`SELECT * FROM test`);
            res.send(resp.rows);
        })
    } catch {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server Started on ${port}`);
    
});
