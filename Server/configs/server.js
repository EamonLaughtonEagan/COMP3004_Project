class Server {
    static send400 = (res, message) => {
        Server.send(res, 400, null, message);
    }

    static send500 = (res, message) => {
        Server.send(res, 500, null, message);
    }

    static sendOK = (res, data, message) => {
        Server.send(res, 200, data, message);
    }

    static sendJSONError(res) {
        Server.send(res, 400, null, "Content-type must be application/json");
    }

    static send = (res, status, payload, message) => {
        res.status(status)
            .setHeader("Content-type", "application/json");

        res.send({
                data: payload,
                message: message
        });
    }

    static isJSON = (req) => {
        return req.is("application/json");
    }
}

module.exports = {Server}