import makeConfigurationController from './configuration/configurationController';
import makeEstablishmentController from './establishment/establishmentController';
import makeApiController from './apiController';
import makeUserController from './user/userController';

const configurationController = makeConfigurationController();
const establishmentController = makeEstablishmentController();
const userController = makeUserController();
const apiController = makeApiController();

export {
  configurationController,
  apiController,
  establishmentController,
  userController,
};
