import makeExportConfiguration from './configuration/exportConfiguration';
import makeCreateUser from './user/createUser';
import {
  configurationDb,
  usersCollection,
  CRUDDb,
  usersDb,
} from '../data-access';
import makeAppointAdminClaim from './user/appointAdminClaim';

const exportConfiguration = makeExportConfiguration({ configurationDb });
const createUser = makeCreateUser({
  usersCollection,
  CRUDDb,
});
const appointAdminClaim = makeAppointAdminClaim({ usersDb });

export { exportConfiguration, createUser, appointAdminClaim };
