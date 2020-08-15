import { request } from "express";

 class BaseController {

    constructor(){};

    return200(response, id, msg) {
        var out = {
            status: "success",
            code: 200,
            id: id,
            result: msg,
        }

        return response.status(200).json(out);
    }

    return404(response, id, msg) {
        var out = {
            status: "not found",
            code: 404,
            id: id,
            result: msg
        }

        return response.status(404).json(out);
    }

    return400(response, id, msg) {
        var out = {
            status: "error",
            code: 400,
            id: id,
            result: msg
        }

        return response.status(400).json(out);
    }

    return500(response, id, msg) {
        var out = {
            status: "server error",
            code: 500,
            id: id,
            result: msg
        }
    }
 }

 export default BaseController;