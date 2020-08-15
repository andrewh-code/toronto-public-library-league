import { request } from "express";

 class BaseController {

    constructor(){};

    return200(response, request, msg) {
        var id = request.uuid;
        var msExecutionTime = process.hrtime(request.startExecutionTime)[1] / 1000000;

        var out = {
            status: "success",
            code: 200,
            id: id,
            msExecutionTime: msExecutionTime,
            result: msg,
        }

        return response.status(200).json(out);
    }

    return404(response, request, msg) {
        var id = request.uuid;
        var msExecutionTime = process.hrtime(request.startExecutionTime)[1] / 1000000;

        var out = {
            status: "not found",
            code: 404,
            id: id,
            msExecutionTime: msExecutionTime,
            result: msg
        }

        return response.status(404).json(out);
    }

    return400(response, request, msg) {
        var id = request.uuid;
        var msExecutionTime = process.hrtime(request.startExecutionTime)[1] / 1000000;

        var out = {
            status: "error",
            code: 400,
            id: id,
            msExecutionTime: msExecutionTime,
            result: msg
        }

        return response.status(400).json(out);
    }

    return500(response, request, msg) {
        var id = request.uuid;
        var msExecutionTime = process.hrtime(request.startExecutionTime)[1] / 1000000;

        var out = {
            status: "server error",
            code: 500,
            id: id,
            msExecutionTime: msExecutionTime,
            result: msg
        }
    }
 }

 export default BaseController;