import express from 'express';
import { Router } from 'express';

import EPlayersController from '../controller/es6/EPlayersController';

const router = Router();

const ePlayersController = new EPlayersController();

// hello world

router.get('/', ePlayersController.hiPlayers);
router.get('/all', ePlayersController.retrieveAllPlayers);
router.get('/season/:seasonId', ePlayersController.retrieveAllPlayersBySeason);
router.get('/individual/person', ePlayersController.searchRetrievePlayers);
router.get('/individual/id/:zuluruId', ePlayersController.retrievePlayerProfileFromZuluruId);



export default router;