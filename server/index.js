const express = require('express');
const { test, jsonTest, joinTest, jsonBuild, metaQuery } = require('../database');

const app = express();
const PORT = 3002;

app.use(express.json());

app.get('/reviews/meta', (req, res) => {
  metaQuery()
    .then((data) => {
      res.status(201).send(data.rows[0].json_build_object);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})


app.get('/jsonBuild', (req, res) => {
  console.log('hi');
  jsonBuild()
    .then((data) => {
      res.status(201).send(data.rows[0].json_build_object)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})



app.get('/jointest', (req, res) => {
  joinTest()
    .then((data) => {
      res.status(201).send(data.rows)
    })
    .catch((err) => {      res.status(500).send(err)
    })
})

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
