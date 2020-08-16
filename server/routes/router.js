// import express from 'express';
// import { Router } from 'express';

// import EHelloController from '../controller/es6/EHelloController';

// const router = Router();

// const eHelloController = new EHelloController("input");

// // hello world
// router.get('/', eHelloController.hello);
// router.get('/world', eHelloController.helloWorld);



// export default router;
import helloroutes from './helloroutes';
import byeroutes from './byeroutes';
import playersroutes from './playersroutes';
import statsroutes from './statsroutes';

export default {
    helloroutes,
    byeroutes,
    playersroutes,
    statsroutes
}
