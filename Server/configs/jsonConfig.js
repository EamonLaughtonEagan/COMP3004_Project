/*
    JSON formatting of query results. formatJobFullJSON is most critical.
    Ex

    JSON Before:
    {
        job_id: 6
        start_time: "2021 06:31 4:30PM"
        first_name: "Fake",
        last_name: "Customer",
        address: "52 Maple Street"
        volume: 50000
        type: "Inground pool",
    }

    JSON After:
    {
        job: {
            job_id: 6,
            start_time: "2021 06:31 4:30PM"
        },
        customer: {
            customer_id: 62,
            first_name: "Fake",
            last_name: "Customer",
        },
        site: {
            address: "52 Maple Street",
            volume: 50000,
            type: "Inground pool"
        }
    }

 */

const formatJobFullJSON = (e) => {
    return {
        job: formatJobJSON(e),
        customer: formatCustomerJSON(e),
        site: formatSiteJSON(e)
    }
}

const formatJobJSON = (e) => {
    return {
        job_id: e.job_id,
        site_id: e.site_id,
        customer_id: e.customer_id,
        name: e.name,
        description: e.description,
        start_time: e.start_time,
        end_time: e.end_time,
    }
}

const formatCustomerJSON = (e) => {
    return {
        customer_id: e.customer_id,
        site_id: e.site_id,
        first_name: e.first_name,
        last_name: e.last_name,
        email: e.email,
        cell: e.cell,
        home: e.home
    }
}

const formatSiteJSON = (e) => {
    return {
        site_id: e.site_id,
        customer_id: e.customer_id,
        address: e.address,
        volume: e.volume,
        type: e.type
    }
}

module.exports = {
    formatJobJSON,
    formatCustomerJSON,
    formatSiteJSON,
    formatJobFullJSON,
}
