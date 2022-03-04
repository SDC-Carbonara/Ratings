COPY reviews (id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness)
FROM '/Users/richardlinley/sei/practice/tooling/dbpractice/reviews.csv'
DELIMITER ','
CSV HEADER;