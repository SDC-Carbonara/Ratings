const { Pool, Client } = require('pg');
const pgconfig = require('./config.js');


const pool = new Pool(pgconfig);

const client = new Client(pgconfig);
client.connect();

const select = `SELECT *
 FROM   reviews, review_photos
 WHERE reviews.id = $1 AND review_photos.review_id = $1`;
const value = [5]

const test = () => {
  return client.query(select, value);
}

const jsonSelect = `SELECT row_to_json(reviews)
FROM (SELECT * FROM reviews where id = $1)
AS reviews`

const jsonTest = () => {
  return client.query(jsonSelect, value);
}

module.exports = {
  test: test,
  jsonTest: jsonTest
}
