import makeConfigurationUseCases from './configuration/configurationUseCases';
import makeEstablishmentUseCases from './establishment/establishmentUseCases';
import makeReservationUseCases from './reservation/reservationUseCases';
import makeUserUseCases from './user/userUseCases';

const configurationUseCases = makeConfigurationUseCases();
const establishmentUseCases = makeEstablishmentUseCases();
const reservationUseCases = makeReservationUseCases();
const userUseCases = makeUserUseCases();

export {
  configurationUseCases,
  establishmentUseCases,
  reservationUseCases,
  userUseCases,
};
