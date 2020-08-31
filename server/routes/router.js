// import express from 'express';
// import { Router } from 'express';

// import EHelloController from '../controller/es6/EHelloController';

// const router = Router();

// const eHelloController = new EHelloController("input");

// // hello world
// router.get('/', eHelloController.hello);
// router.get('/world', eHelloController.helloWorld);



// export default router;
import helloroutes from './helloroutes.js';
import byeroutes from './byeroutes.js';
import playersroutes from './playersroutes.js';
import statsroutes from './statsroutes.js';

export default {
    helloroutes,
    byeroutes,
    playersroutes,
    statsroutes
}
