import express from 'express';
import Router from 'express';

import EStatsController from '../controller/es6/EStatsController.js';

const router = Router();

const eStatsController = new EStatsController();

// hello world
router.get('/leaders/goals', eStatsController.retrieveGoalLeaders);
router.get('/leaders/assists', eStatsController.retrieveAssistLeaders);
router.get('/leaders/salary', eStatsController.retrieveSalaryLeaders);
router.get('/leaders/secondassists', eStatsController.retrieveSecondAssistLeaders);
router.get('/leaders/ds', eStatsController.retrieveDefensiveLeaders);
router.get('/leaders/wins', eStatsController.retrieveWinsLeaders);

export default router;