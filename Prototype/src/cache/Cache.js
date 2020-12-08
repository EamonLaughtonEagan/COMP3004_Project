const endpoint = "https://bsdbwvwyf7.execute-api.us-east-2.amazonaws.com/dev/";

const endpointJobs = endpoint + "jobs/";
const endpointUsers = endpoint + "users/";
const endpointCustomers = endpoint + "customers/";

const jsonType = "application/json";

export class Cache {
    static lastFetch = null;

    static jobs = [];
    static customers = [];
    static users = [];

    static fetchedRecently() {
        return Date.now() - Cache.lastFetch > 60000 * 5;
    }

    static initialize = () => {
        console.log("Initializing cache...");
        Cache.lastFetch = Date.now();

        Users.fetchUsers()
            .then((r) => {
                console.log(
                    "Fetched " +
                        Cache.users.length +
                        " users (" +
                        (Date.now() - Cache.lastFetch) +
                        "ms)"
                );
            })
            .catch((err) => {
                console.error("Error while fetching users: " + err.message);
            });

        Customers.fetchCustomers()
            .then((r) => {
                console.log(
                    "Fetched " +
                        Cache.customers.length +
                        " customers (" +
                        (Date.now() - Cache.lastFetch) +
                        "ms)"
                );
            })
            .catch((err) => {
                console.error("Error while fetching customers: " + err.message);
            });

        Jobs.fetchJobs()
            .then((r) => {
                console.log(
                    "Fetched " +
                        Cache.jobs.length +
                        " jobs (" +
                        (Date.now() - Cache.lastFetch) +
                        "ms)"
                );
            })
            .catch((err) => {
                console.error("Error while fetching jobs: " + err.message);
            });
    };

    static createPostJSON = (obj) => {
        return {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(obj),
        };
    };

    static validateJSONResponse = (res) => {
        if (!res.ok) {
            throw new Error("Server error during POST request: " + res.message);
        }

        const contentType = res.headers.get("Content-Type");
        if (contentType !== jsonType) {
            throw new Error(
                "Unexpected Content-Type " +
                    contentType +
                    " in POST request response."
            );
        }

        return res;
    };
}

export class Users {
    /**
     * Fetch users from the server asynchronously.
     * @return If successful, a resolved Promise. Otherwise, an error is thrown.
     */
    static fetchUsers = () => {
        return fetch(endpointUsers)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                Cache.users = json.data;
                return Promise.resolve();
            })
            .catch((err) => {
                console.log("Error while fetching users: " + err.message);
                return Promise.reject(err);
            });
    };

    static findUser = (user_id) => {
        return Cache.users.find((u) => u.user_id === user_id);
    };

    static getUsers = () => {
        return Cache.users;
    };
}

export class Jobs {
    /**
     * Fetch jobs from the server asynchronously
     * @return If successful, a resolved Promise. Otherwise, an error is thrown.
     */
    static fetchJobs = () => {
        return fetch(endpointJobs)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                Cache.jobs = json.data;
                return Promise.resolve();
            })
            .catch((err) => {
                console.log("Error while fetching jobs: " + err.message);
                return Promise.reject(err);
            });
    };

    static getJob = (job_id) => {
        Cache.jobs.forEach((j) => {
            if (j.job_id === job_id) {
                return j;
            }
        });

        return null;
    };

    static getJobs = () => {
        return Cache.jobs;
    };

    /**
     * Send POST request to server to make a new
     * @param job Object with job properties to create. Must have these properties:
     *      - start_time, endtime "YYYY MM:DD HH:MM" string
     *      - name, description:
     * @param success   Callback run on success (job object is passed)
     * @param fail      Callback to run on failure (error is passed)
     * @return {Promise<T | Promise<never>>}
     */
    static postJob = (job, success, fail) => {
        if (
            !job ||
            !job.customer_id ||
            !job.start_time ||
            !job.end_time ||
            !job.site_id ||
            !job.name ||
            !job.description
        ) {
            fail(
                new Error(
                    "Malformed job post. Job object  with .job.customer_id"
                )
            );
        }

        fetch(endpointJobs, Cache.createPostJSON(job))
            .then((response) => {
                const json = Cache.validateJSONResponse(response).json();
                console.log("job PUT reponse from server: " + json);
                const job = JSON.parse(json);

                success(job);
                return Promise.resolve();
            })
            .catch((error) => {
                fail(error);
                return Promise.resolve();
            });
    };
}

export class Customers {
    /**
     * Fetch users from the server. Blocks thread while waiting for response.
     * @return If successful, a resolved Promise. Otherwise, an error is thrown.
     */
    static fetchCustomers = () => {
        return fetch(endpointCustomers)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                Cache.customers = json.data;
                return Promise.resolve();
            })
            .catch((err) => {
                console.log("Error while fetching customers: " + err.message);
                return Promise.reject(err);
            });
    };

    static findCustomer = (customer_id) => {
        return Cache.customers.find((c) => c.customer_id === customer_id);
    };

    static findCustomerBySiteId(site_id) {
        return Cache.customers.find((customer) => {
            customer.sites.some((site) => site.site_id === site_id);
        });
    }

    static findCustomerSiteId(customer) {
        if (!customer || !customer.sites || customer.sites.length < 1) {
            return null;
        }

        return customer.sites[0];
    }

    static getCustomers = () => {
        return Cache.customers;
    };
}
