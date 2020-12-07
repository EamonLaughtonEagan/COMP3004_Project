const endpoint = "https://bsdbwvwyf7.execute-api.us-east-2.amazonaws.com/dev/";

const endpointJobs = endpoint + "jobs/";
const endpointUsers = endpoint + "users/";
const endpointCustomers = endpoint + "customers/";

const jsonType = "application/json";

export class Cache {
    static lastFetch = null;
    static initialized = false;

    static jobs = [];
    static customers = [];
    static users = [];

    static initialize = () => {
        console.log("Initializing cache...");
        Cache.lastFetch = Date.now();

        Users.fetchUsers().then((r) => {
            console.log(
                "Fetched " +
                    Cache.users.length +
                    " users (" +
                    (Date.now() - Cache.lastFetch) +
                    "ms)"
            );
        });

        Customers.fetchCustomers().then((r) => {
            console.log(
                "Fetched " +
                    Cache.customers.length +
                    " customers (" +
                    (Date.now() - Cache.lastFetch) +
                    "ms)"
            );
        });

        Jobs.fetchJobs().then((r) => {
            console.log(
                "Fetched " +
                    Cache.jobs.length +
                    " jobs (" +
                    (Date.now() - Cache.lastFetch) +
                    "ms)"
            );
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
                throw err;
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
                throw err;
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

    static postJob = (jobObject) => {
        if (!jobObject || !jobObject.job || !jobObject.customer) {
            throw new Error(
                "Malformed job post. jobObject must contain at least .job and .customer"
            );
        }

        const resJSON = fetch(
            endpointJobs + "/" + jobObject.job.job_id,
            Cache.createPostJSON(jobObject)
        )
            .then((response) => {
                return Cache.validateJSONResponse(response).json();
            })
            .catch((error) => {
                throw error;
            });

        console.log("Response from server: " + JSON.stringify(resJSON));
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
                throw err;
            });
    };

    static getCustomer = (customer_id) => {
        Cache.customers.forEach((c) => {
            if (c.customer_id === customer_id) {
                return c;
            }
        });

        return null;
    };

    static findCustomer(site_id) {
        return Cache.customers.find((customer) => {
            customer.sites.some((site) => site.site_id === site_id);
        });
    }

    static getCustomers = () => {
        return Cache.customers;
    };
}
