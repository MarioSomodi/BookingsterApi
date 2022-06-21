import express from 'express';
import { establishmentController } from '../controllers';

const establishmentRouter = express.Router();

establishmentRouter.get('', establishmentController.Get());
establishmentRouter.post('', establishmentController.Post());

export default establishmentRouter;
