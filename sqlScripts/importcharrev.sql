COPY characteristic_reviews (id,characteristic_id, review_id, value)
FROM '/Users/richardlinley/sei/practice/tooling/dbpractice/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;