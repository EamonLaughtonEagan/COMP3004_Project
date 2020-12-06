const endpoint = "https://bsdbwvwyf7.execute-api.us-east-2.amazonaws.com/dev/";

const endpointJobs = endpoint + "jobs/";
const endpointUsers = endpoint + "users/";
const endpointCustomers = endpoint + "customers/";

let jobs = [];
let customers = [];
let users = [];

const fetchJobs = async () => {
    try {
        const response = await fetch(endpointJobs);
        const json = await response.json();

        jobs = json.data;
        return jobs;
    } catch (error) {
        console.error(error);
    }
};

const fetchCustomers = async () => {
    try {
        const response = await fetch(endpointCustomers);
        const json = await response.json();

        customers = json.data;
        return customers;
    } catch (error) {
        console.error("Error while fetching customers: " + error.message);
    }
};

const fetchUsers = async () => {
    try {
        const response = await fetch(endpointUsers);
        const json = await response.json();

        users = json.data;
        return users;
    } catch (error) {
        console.error("Error while fetching users: " + error.message);
    }
}

const getJobs = () => {
    return jobs;
};

const getCustomers = () => {
    return customers;
};

const getUsers = () => {
    return users;
};

module.exports = {fetchJobs, fetchCustomers, fetchUsers,
    getJobs, getCustomers, getUsers };
