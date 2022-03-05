const { Pool, Client } = require('pg');
const pgconfig = require('./config.js');


const pool = new Pool(pgconfig);

const client = new Client(pgconfig);
client.connect();

const select = `SELECT *
 FROM   reviews, review_photos
 WHERE reviews.reviewer_name = $1 AND review_photos.review_id = $2`;
const value = ["bigbrother", 5]

const test = () => {
  return client.query(select, value);
}

const jsonSelect = `SELECT row_to_json(reviews)
FROM (SELECT * FROM reviews where id = $1)
AS reviews`

const jsonTest = () => {
  return client.query(jsonSelect, value);
}

const joinSelect = `SELECT rs.*, rp.url
FROM reviews AS rs
LEFT JOIN review_photos rp on rs.id = rp.review_id
WHERE rs.id = $1`

const joinTest = () => {
  return client.query(joinSelect, value)
}

const values = [2, 2]
const jsonBuildSelect =
// `SELECT * FROM reviews where id = $1`;

// `SELECT row_to_json(tests)
// FROM (
//   SELECT id from "test"
// ) as tests`

// `SELECT json_build_object(
//   'hello_richard', (SELECT json_agg(row_to_json("reviews")) from "reviews" WHERE id = 2)
// )`
`SELECT json_build_object(
  'product', $1,
  'page', 0,
  'count', $2,
  'results', array_agg(row_to_json(result_body)))
    FROM (

        SELECT rs.review_id, rs.rating, rs.summary, rs.recommend, rs.response, rs.body, rs.date, rs.reviewer_name, rs.helpfulness,
          (SELECT json_agg(photos)
            FROM (
              SELECT rp.id, rp.url
              FROM review_photos as rp
              WHERE rp.review_id = rs.review_id
            ) photos
          ) as photos


        FROM reviews AS rs
        WHERE rs.product_id = $1 LIMIT $2
      ) AS result_body`

      // (SELECT json_rp.review_id
      // FROM review_photos as rp
      // WHERE rp.review_id = rs.id

  // (
  //   SELECT array_to_json(array_agg(row_to_json(photos)))
  //   FROM (
  //     SELECT rp.url
  //     FROM review_photos AS rp
  //     WHERE rs.id = $1
  //   )

  // ) AS photos

  // FROM reviews AS rs


// `SELECT json_build_object(
//   'results', (SELECT json_agg(row_to_json(reviews)) from reviews where product_id = $1),
//   'photos', (SELECT json_agg(row_to_json(review_photos)) from review_photos where review_id = $1)
//   )`
const metaValues = [5];
const flooop = metaValues[0];
const jsonBuild = () => {

  return client.query(jsonBuildSelect, values);
}

const metaSelect = `SELECT json_build_object('product_id', ${flooop},
'ratings', (SELECT json_object_agg
  (rs.rating, (SELECT count(rating) FROM reviews WHERE product_id = $1 AND rating = rs.rating))
  AS ratings FROM reviews rs WHERE rs.product_id = $1),
'recommended', (SELECT json_object_agg
  (rs.recommend, (SELECT count(recommend) FROM reviews WHERE product_id = $1 AND recommend = rs.recommend))
  AS recommended FROM reviews rs WHERE rs.product_id = $1))`

// WORKING RATINGS QUERY BELOW THIS LINE
// `(SELECT json_object_agg
//   (rs.rating, (SELECT count(rating) FROM reviews WHERE product_id = 37311 AND rating = rs.rating))
//   AS ratings FROM reviews rs WHERE rs.product_id = 37311)`



// `(SELECT json_object_agg
//   (rs.rating, json_build_object
//   (rs.rating, (SELECT count(rating) FROM reviews WHERE product_id = 37311 AND rating = rs.rating)))
//   AS ratings FROM reviews rs WHERE rs.product_id = 37311)`

// ` SELECT json_object_agg('richard',json_build_object
// (rs.rating, (SELECT count(rating) FROM reviews AS rs WHERE rs.product_id = 37311 AND rating = rs.rating))  FROM reviews AS rs WHERE rs.product_id = 37311)





// `
// SELECT rating, recommend FROM reviews where product_id = $1

// SELECT json_build_object (SELECT json_build_object (
//   'product_id', $1,
//   'ratings', (SELECT json_agg(row_to_json(reviews)) from reviews WHERE product_id = $1)
// ) FROM reviews WHERE product_id = $1

const metaQuery = () => {

return client.query(metaSelect, metaValues);
}

module.exports = {
  test: test,
  jsonTest: jsonTest,
  joinTest: joinTest,
  jsonBuild: jsonBuild,
  metaQuery: metaQuery

}







/*

(SELECT json_object_agg
  (rs.rating, row_to_json(count_query))
 FROM
   (SELECT count(rating) FROM reviews WHERE product_id = 37311 AND rating = rs.rating)count_query)
  AS ratings FROM reviews rs WHERE rs.product_id = 37311)
*/