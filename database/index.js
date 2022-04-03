const { Pool, Client } = require('pg');
const pgconfig = require('./config.js');


const pool = new Pool(pgconfig);

const client = new Client(pgconfig);
client.connect();

const select = `select * from reviews where review_id = 1`;
const value = [5]

const test = () => {
  return client.query(select);
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

const jsonBuild = () => {

  return client.query(jsonBuildSelect, values);
}


const reviewsSelect =
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
      ) AS result_body`;




const reviewQuery = (queryValues) => {
  let reviewValues = [parseInt(queryValues.product_id)];
  if (!queryValues.count) {
    reviewValues.push(5);
  } else {
    reviewValues.push(parseInt(queryValues.count))
  }
  // console.log(reviewValues);
  // client.connect();

  return pool.query(reviewsSelect, reviewValues);


}

const metaQuery = (queryValues) => {


  const metaSelect = `(SELECT json_build_object('product_id', ${queryValues} ,
'ratings',
  (SELECT json_object_agg(
    rs.rating, (
      SELECT count(rating) FROM reviews WHERE product_id = $1 AND rating = rs.rating))
        AS ratings FROM reviews rs WHERE rs.product_id = $1),
'recommended',
  (
    SELECT json_object_agg
      (rs.recommend, (
        SELECT count(recommend) FROM reviews WHERE product_id = $1 AND recommend = rs.recommend))
          AS recommended FROM reviews rs WHERE rs.product_id = $1),
  'characteristics',
    (
      select json_object_agg
        (c.name,
          json_build_object
            (
	            'id', c.id,
                'value',
                  (
                    select avg(value) from characteristic_reviews where characteristic_id = c.id)))
                     from characteristics c where c.product_id = $1)
    ))`;


  return pool.query(metaSelect, [queryValues]);
}

module.exports = {
  test: test,
  jsonTest: jsonTest,
  joinTest: joinTest,
  jsonBuild: jsonBuild,
  reviewQuery: reviewQuery,
  metaQuery: metaQuery

}





//////////////////// QUERY GRAVEYARD ///////////////////////

/*

(SELECT json_object_agg
  (rs.rating, row_to_json(count_query))
 FROM
   (SELECT count(rating) FROM reviews WHERE product_id = 37311 AND rating = rs.rating)count_query)
  AS ratings FROM reviews rs WHERE rs.product_id = 37311)
*/


/* from json build select


// `SELECT * FROM reviews where id = $1`;

// `SELECT row_to_json(tests)
// FROM (
//   SELECT id from "test"
// ) as tests`

// `SELECT json_build_object(
//   'hello_richard', (SELECT json_agg(row_to_json("reviews")) from "reviews" WHERE id = 2)
// )`



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

*/


/* from meta select


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

// flooop = metaValues[0];
  // console.log(metaValues, flooop)



// `
// SELECT rating, recommend FROM reviews where product_id = $1

// SELECT json_build_object (SELECT json_build_object (
//   'product_id', $1,
//   'ratings', (SELECT json_agg(row_to_json(reviews)) from reviews WHERE product_id = $1)
// ) FROM reviews WHERE product_id = $1






//INEXPLICABLY I CANNOT USE A PREPARED STATEMENT FOR MY PRODUCT ID IN MY META QUERY SO I HAVE TO USE A TEMPLATE LITERAL WHYYYYYY????????

 // let metaValues = [parseInt(queryValues.product_id)];
  // let flooop = metaValues[0];
  // console.log(queryValues)


//removed from query
// SELECT json_object_agg
// (c.name, (
//   select json_object_agg(characteristics.name, row_to_json(characteristics)) from characteristics where product_id = 1)

//   )  AS characteristics FROM characteristics c WHERE c.product_id = 1


//     (select json_build_object(c.name, (select json_build_object('id', c.id, c.name, (select avg(value) from characteristic_reviews where characteristic_id = 5
// )) from characteristics c where c.product_id = 65465 and c.name = 'Fit'))from characteristics c where c.product_id = 1)

//tested in gui

//     (select json_build_object(c.name, (select json_build_object('id', c.id, c.name, (select avg(value) from characteristic_reviews where characteristic_id = 5
// )) from characteristics c where c.product_id = 65465 and c.name = 'Fit'))from characteristics c where c.product_id = 1)

// worming in gui

//not wormig

// (
//   SELECT json_object_agg
//     (c.name, (
//       SELECT name FROM characteristics WHERE product_id = 10)

//       ) AS characteristics FROM characteristics c WHERE c.product_id = 10

//     )

*/