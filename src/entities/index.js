import buildMakeConfiguration from './configuration/configuration.entity';
import buildMakeUser from './user/user.entity';
import buildMakeEstablishment from './establishment/establishment.entity';
import buildMakeImages from './images/images.entity';
import buildMakeWorkingHours from './workingHours/workingHours.entity';
import buildMakeLocation from './location/location.entity';
import buildMakeTable from './table/table.entity';
import buildMakeTables from './table/tables.entity';

const makeConfiguration = buildMakeConfiguration();
const makeUser = buildMakeUser();
const makeImages = buildMakeImages();
const makeTable = buildMakeTable();
const makeTables = buildMakeTables({ makeTable });
const makeWorkingHours = buildMakeWorkingHours();
const makeLocation = buildMakeLocation();
const makeEstablishment = buildMakeEstablishment({
  makeImages,
  makeWorkingHours,
  makeLocation,
  makeTables,
});

export {
  makeConfiguration,
  makeUser,
  makeEstablishment,
  makeImages,
  makeWorkingHours,
};
