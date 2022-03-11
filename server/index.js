const express = require('express');
const { test, jsonTest, joinTest, jsonBuild, reviewQuery,metaQuery } = require('../database');

const app = express();
const PORT = 3002;

app.use(express.json());


app.get('/reviews/meta', (req, res) => {

  // console.log(req.query);

  metaQuery(req.query.product_id)
    .then((data) => {
      res.status(201).send(data.rows[0].json_build_object);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})


app.get('/reviews', (req, res) => {
  // console.log(req.query);
  // console.log([req.query.product_id, req.query.count])
  // console.log(req.params);
  reviewQuery(req.query)
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
  // console.log('test', test);

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
