import makeConfigurationController from './configuration/configurationController';
import makeEstablishmentController from './establishment/establishmentController';
import makeApiController from './apiController';
import makeUserController from './user/userController';
import makeReservationController from './reservation/reservationController';

const configurationController = makeConfigurationController();
const establishmentController = makeEstablishmentController();
const userController = makeUserController();
const apiController = makeApiController();
const reservationController = makeReservationController();

export {
  configurationController,
  apiController,
  establishmentController,
  userController,
  reservationController,
};
