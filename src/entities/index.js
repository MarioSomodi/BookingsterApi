import buildMakeConfiguration from './configuration/configuration.entity';
import buildMakeUser from './user/user.entity';
import buildMakeEstablishment from './establishment/establishment.entity';
import buildMakeImages from './images/images.entity';
import buildMakeWorkingHours from './workingHours/workingHours.entity';
import buildMakeLocation from './location/location.entity';

const makeConfiguration = buildMakeConfiguration();
const makeUser = buildMakeUser();
const makeImages = buildMakeImages();
const makeWorkingHours = buildMakeWorkingHours();
const makeLocation = buildMakeLocation();
const makeEstablishment = buildMakeEstablishment({
  makeImages,
  makeWorkingHours,
  makeLocation,
});

export {
  makeConfiguration,
  makeUser,
  makeEstablishment,
  makeImages,
  makeWorkingHours,
};
