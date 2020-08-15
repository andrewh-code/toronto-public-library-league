class EByeController {

    // constructor method
    constructor(){
        this.bye = this.bye.bind(this);
        this.byeWorld = this.byeWorld.bind(this);

    };

    bye(request, response) {
        let output = {
            status: "success",
            result: "bye"
        };

        return response.status(200).json(output);
    }

    byeWorld(request, response) {
        
        let output = {
            status: "success",
            result: "bye world"
        };

        return response.status(200).json(output);
    }
}


export default EByeController;