import express from 'express';
import { reservationController } from '../controllers';

const reservationRouter = express.Router();

reservationRouter.post('/', reservationController.Post());

export default reservationRouter;
