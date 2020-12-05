##README
This is the middleware of our application. It is server-side code for receiving HTTP requests from clients. Requests are mapped to database queries, and the results are returned to the client.

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
        - 


</details>

<details>
    <summary>summary</summary>


</details>


Update an existing job:

    PUT
    https://bsdbwvwyf7.execute-api.us-east-2.amazonaws.com/dev/jobs/

# A collapsible section with markdown
