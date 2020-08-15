class EHelloController {

    // constructor method
    constructor(){
        this.hello = this.hello.bind(this);
        this.helloWorld = this.helloWorld.bind(this);
    };

    hello(request, response) {
        let output = {
            status: "success",
            result: "hello"
        };

        return response.status(200).json(output);
    }

    helloWorld(request, response) {
        
        let output = {
            status: "success",
            result: "hello world"
        };

        return response.status(200).json(output);
    }
}


export default EHelloController;