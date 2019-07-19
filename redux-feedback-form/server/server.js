const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

//Import pool so we can query the database
const pool = require('./modules/pool');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.get('/feedback', (req, res) => {
    const sqlText = `SELECT * FROM feedback ORDER BY "id"`
    pool.query(sqlText)
        .then(response => {
            res.send(response.rows);
        })
        .catch(error => {
            console.log(error)
            res.sendStatus(500);
        })
})

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});