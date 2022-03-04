const express = require('express');
const { test, jsonTest } = require('../database');

const app = express();
const PORT = 3002;

app.use(express.json());


app.get('/test', (req, res) => {


  test()
    .then((data) => {
      // console.log(data)
      res.status(201).send(data.rows);
    })
    .catch((err) => {
      console.error('failed');
      console.error(err);
      res.sendStatus(500)
    })


})


app.get('/jsontest', (req, res) => {
  jsonTest()
    .then((data) => {
      res.status(201).send(data.rows)
    })
    .catch((err) => {
      console.error('failed');
      console.error(err);
      res.sendStatus(500)
    })

})

app.listen(PORT, () => {
  console.log(`Listening @ ${PORT}`);
})
