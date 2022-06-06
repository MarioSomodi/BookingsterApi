import buildMakeConfiguration from './configuration/configuration.entity';
import buildMakeUser from './user/user.entity';
import buildMakeEstablishment from './establishment/establishment.entity';

const makeConfiguration = buildMakeConfiguration();
const makeUser = buildMakeUser();
const makeEstablishment = buildMakeEstablishment();

export { makeConfiguration, makeUser, makeEstablishment };
