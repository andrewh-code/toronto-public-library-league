// https://www.robinwieruch.de/node-js-express-tutorial

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import router from './routes/router.js';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 1234;

// middleware
app.use((request, response, next) => {
    var id = uuidv4();
    request.uuid = id;
    var startExecutionTime = process.hrtime();
    request.startExecutionTime = startExecutionTime;
    
    response.setHeader('Access-Cotntrol-Allow-Origin', 'http://localhost:3000');
    response.setHeader('Access-Control-All-Methods', 'GET');
    response.setHeader('Access-Control-Allow_headers', 'X-Requested-With,content-type');
    
    next();
});

// host pics
const __dirname = path.resolve();
var dir = path.join(__dirname, '/public');
app.use(express.static(dir));
app.use('/hello', router.helloroutes);
app.use('/bye', router.byeroutes);
app.use('/players', router.playersroutes);
app.use('/stats', router.statsroutes);


app.post('/post', (request, response) => {
    var id = uuidv4();
    const msg = {
        id,
        text: request.body.text
    };

    return response.send(msg);
});


app.listen(PORT, () => console.log(`server running on ${process.env.PORT} ...`),
);