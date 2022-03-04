COPY review_photos (id, review_id, url)
FROM '/Users/richardlinley/sei/practice/tooling/dbpractice/reviews_photos.csv'
DELIMITER ','
CSV HEADER;