import express from 'express';
import { configurationController } from '../controllers';

const configurationRouter = express.Router();

configurationRouter.get('/', configurationController.Get());

export default configurationRouter;
