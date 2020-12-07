const endpoint = "https://bsdbwvwyf7.execute-api.us-east-2.amazonaws.com/dev/";

const endpointJobs = endpoint + "jobs/";
const endpointUsers = endpoint + "users/";
const endpointCustomers = endpoint + "customers/";

let jobs = [];
let customers = [];
let users = [];

// TODO: Initialize this data on app startup asynchronously
const initialize = async () => {
    await Users.fetchUsers();
    await Customers.fetchCustomers();
};

export class Users {
    static fetchUsers = async () => {
        try {
            const response = await fetch(endpointUsers);
            const json = await response.json();

            users = json.data;
            return users;
        } catch (error) {
            console.error("Error while fetching users: " + error.message);
        }
    };

    static findUser = (user_id) => {
        users.forEach((u) => {
            if (u.user_id === user_id) {
                return u;
            }
        });

        return null;
    };

    static getUsers = () => {
        return users;
    };
}

export class Jobs {
    static getJob = (job_id) => {
        jobs.forEach((j) => {
            if (j.job_id === job_id) {
                return j;
            }
        });

        return null;
    };

    static fetchJobs = async () => {
        try {
            const response = await fetch(endpointJobs);
            const json = await response.json();

            jobs = json.data;
            return jobs;
        } catch (error) {
            console.error(error);
        }
    };

    static getJobs = () => {
        return jobs;
    };
}

export class Customers {
    static getCustomer = (customer_id) => {
        customers.forEach((c) => {
            if (c.customer_id === customer_id) {
                return c;
            }
        });

        return null;
    };

    static fetchCustomers = async () => {
        try {
            const response = await fetch(endpointCustomers);
            const json = await response.json();

            customers = json.data;
            return customers;
        } catch (error) {
            console.error("Error while fetching customers: " + error.message);
        }
    };

    static getCustomers = () => {
        return customers;
    };
}
