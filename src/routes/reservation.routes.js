import express from 'express';
import { reservationController } from '../controllers';

const reservationRouter = express.Router();

reservationRouter.post('/', reservationController.Post());
reservationRouter.get('/owner', reservationController.GetByOwnerAndStatus());
reservationRouter.get('/user', reservationController.GetByUserAndStatus());
reservationRouter.patch(
  '/status',
  reservationController.PatchReservationStatus()
);

export default reservationRouter;
