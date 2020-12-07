export class Server {
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

    static send = (res, status, data, message) => {
        res.status(status).send({
            data: data,
            message: message
        });
    }

    static isJSON = (req) => {
        return req.is("application/json");
    }

}
