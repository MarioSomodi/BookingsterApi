import buildMakeConfiguration from './configuration/configuration.entity';
import buildMakeUser from './user/user.entity';

const makeConfiguration = buildMakeConfiguration();
const makeUser = buildMakeUser();

export { makeConfiguration, makeUser };
