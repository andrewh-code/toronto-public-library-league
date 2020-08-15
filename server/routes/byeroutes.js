import express from 'express';
import { Router } from 'express';

import EByeController from '../controller/es6/EByeController';

const router = Router();

const eByeController = new EByeController();

// hello world
router.get('/', eByeController.bye);
router.get('/world', eByeController.byeWorld);

export default router;