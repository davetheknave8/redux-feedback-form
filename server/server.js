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

app.post('/feedback', (req, res) => {
    const newFeedback = req.body;
    const sqlText = `INSERT INTO "feedback"("feeling", "understanding", "support", "comments")
                        VALUES($1, $2, $3, $4);`;
    const value = [Number(newFeedback.feeling), Number(newFeedback.understanding), Number(newFeedback.support), newFeedback.comments]
    pool.query(sqlText, value)
        .then(response => {
            res.sendStatus(201);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

app.delete('/feedback/:id', (req, res) => {
    const idToDelete = req.params.id;
    const sqlText = `DELETE FROM "feedback" WHERE "id"=$1;`;
    const values =[idToDelete];
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

app.put('/feedback/:id', (req, res) => {
    const idToUpdate= req.params.id;
    const flagged = req.body.flagged;
    const sqlText = `UPDATE "feedback" SET "flagged"=$1 WHERE "id"=$2;`;
    const values = [flagged, idToUpdate];
    pool.query(sqlText, values)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});