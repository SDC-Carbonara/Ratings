### System Design Capstone || Atelier API


The purpose of this project was to create a database (I chose to use PostgreSQL) and then horizontally scale AWS EC2 instances of a server that could interact with the database.

I additionally added an EC2 instance which utilized NginX to act as a load balancer, I used the round-robin technique to distribut requests to my server instances.

The first leg of this sprint was to populate a postgreSQL database with entries from a CSV, once that was completed. Complex nested SQL queries were created to return the data in the same structure as it was delivered to us in the FEC project (Project Catwalk, please see my resume for a link). Local Machine testing was perfomed using Artillery.io, once acceptable metrics were achieved I moved to the second leg.

The second leg of the sprint was to upload my database to the cloud using AWS, as well as create a server that could interact with that database. Once that was achieved, I created an image of my server instance, and cloned it four additional times. I frequently used loader.io to test my server and databse with increasing amounts of requests per second. Finally achieving a satisfactory 3000 Requests Per Second once I had created five instances of my server and set up load balancing.


## Images

# All Seven AWS EC2 Instances open and running in sync
![](https://i.imgur.com/P5t4R4Z.png)

# PostgreSQL Nested Queries
![](https://i.imgur.com/CherO2H.png)

![](https://i.imgur.com/M7QW94o.png)


## Loader.io load balancing tests

# Final Test, 3000 Requests per second (2 different endpoints @1500RPS each simultaneously)

![](https://i.imgur.com/ekD8Eay.png)

# Other tests, increasing in efficiency
![](https://i.imgur.com/IQt28i1.png)
![](https://i.imgur.com/jJG2APz.png)
![](https://i.imgur.com/NjNJPqr.png)
![](https://i.imgur.com/HFC35s1.png)
![](https://i.imgur.com/QSZZg03.png)

