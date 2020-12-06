### REST API Documentation
 
This code is the server-side middleware for our app. It receives HTTP requests from clients, mapping them to database and returning the results. Here is a short breakdown of the overall structure:

1. AWS API Gateway routes url requests to this code. This app is built with Serverless CLI (see: serverless.yml) wrapped in Express for cleaner routing.

2. When the API gateway receives a request, it is received and routed at index.js

3. The request is then sent to the appropriate file (ie. /routes/jobs.js, /routes/users.js, etc.) 

4. The request is then validated and, if correct, a query is run against the database.

5. The database is hosted on AWS RDS. Connection pooling is done in /configs/dbConfig.js. Connection to the database is maintained if requests are made within three seconds of each other.

6. In a callback, the response from the database is sent back to the client.

The root URI of the api is https://bsdbwvwyf7.execute-api.us-east-2.amazonaws.com/dev/

API calls are made through standard HTTP get/post/put/delete requests to this URI. Some examples of how to use the API are listed below.

<details>
  <summary>Query a complete list of jobs</summary>
    
    Method:     GET
    Resource:   jobs/
    Params:     None

    Ex: curl -X GET https://bsdbwvwyf7.execute-api.us-east-2.amazonaws.com/dev/jobs/

    Response:
    {
        "data": [
            {
                "job_id": 1,
                "customer_id": 1,
                "site_id": 1,
                "start_time": "2020-11-30T02:51:37.000Z",
                "end_time": "2020-11-30T04:51:37.000Z",
                "name": "Pool cleaning + deliver order",
                "description": "Clean the pool and deliver the chlorine that Joe ordered",
                "first_name": "joe",
                "last_name": "blow",
                "email": "joe.blow@gmail.com",
                "cell": "555 432-1987",
                "home": "555 843-4812",
                "address": "123 Smiley St.",
                "type": "Inground pool",
                "volume": 50000
            },
            {
                "job_id": 2,
                "customer_id": 24,
                "site_id": 2,
                "start_time": "2020-12-04T22:45:12.000Z",
                "end_time": "2020-12-05T00:45:12.000Z",
                "name": "Install SuperFlo VS Pump",
                "description": "Evan needs a new SuperFlo VS installed. \nPack 10ft of red wire, 1 inch conduit, and strain relief. \nAlso bring chlorine, as his pool has turned green.",
                "first_name": "Evan",
                "last_name": "Edmunds",
                "email": "eevanedmunds@yahoo.ca",
                "cell": "555 384-3825",
                "home": "555 136-1981",
                "address": "732 Sage Crescent",
                "type": "Inground pool",
                "volume": 65000
            }
        ],
        "message": "All jobs successfully retrieved."
    }


</details>
<details>
  <summary>Query a specific job by id</summary>

    Method:     GET
    Resource:   jobs/{id}
    Params:     None

    Ex: curl -X GET https://bsdbwvwyf7.execute-api.us-east-2.amazonaws.com/dev/jobs/2
</details>

<details>
    <summary>Create a new job</summary>

    Method:     POST 
    Resource:   jobs/
    Params:
        - customer_id       
        - start_time        (SQL DATETIME format)
        - end_time          (SQL DATETIME format)
        - name
        - description


</details>

<details>
    <summary>Update an existing job</summary>
     
     Method:    PUT
     Resource:  jobs/
     Params:
        - job_id            REQUIRED
        - customer_id       OPTIONAL
        - site_id           OPTIONAL
        - start_time        OPTIONAL
        - end_time          OPTIONAL
        - name              OPTIONAL
        - description       OPTIONAL

</details>



