import notFound from './notFound';
import {
  exportConfiguration,
  createUser,
  appointAdminClaim,
} from '../use-cases';
import makeGetConfiguration from './configuration/getConfiguration';
import makePostUser from './user/postUser';
import makePostAdmin from './user/postAdmin';

const getConfiguration = makeGetConfiguration({ exportConfiguration });
const postUser = makePostUser({ createUser });
const postAdmin = makePostAdmin({ appointAdminClaim });

export { getConfiguration, notFound, postUser, postAdmin };
