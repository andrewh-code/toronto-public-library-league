import express from 'express';
import Router from 'express';

import EHelloController from '../controller/es6/EHelloController.js';

const router = Router();

const eHelloController = new EHelloController("input");

// hello world
router.get('/', eHelloController.hello);
router.get('/world', eHelloController.helloWorld);

export default router;