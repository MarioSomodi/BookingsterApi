import express from 'express';
import { reservationController } from '../controllers';

const reservationRouter = express.Router();

reservationRouter.post('/', reservationController.Post());
reservationRouter.get('/owner', reservationController.GetByOwnerAndStatus());

export default reservationRouter;
