import notFound from './notFound';
import { exportConfiguration, createUser } from '../use-cases';
import makeGetConfiguration from './configuration/getConfiguration';
import makePostUser from './user/postUser';

const getConfiguration = makeGetConfiguration({ exportConfiguration });
const postUser = makePostUser({ createUser });

export { getConfiguration, notFound, postUser };
