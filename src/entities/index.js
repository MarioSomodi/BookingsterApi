import buildMakeConfiguration from './configuration/configuration.entity';
import buildMakeUser from './user/user.entity';
import buildMakeEstablishment from './establishment/establishment.entity';
import buildMakeImages from './image/images.entity';
import buildMakeWorkingHours from './workingHours/workingHours.entity';
import buildMakeLocation from './location/location.entity';
import buildMakeTable from './table/table.entity';
import buildMakeTables from './table/tables.entity';
import buildMakeImage from './image/image.entity';
import buildMakeReservation from './reservation/reservation.entity';

const makeConfiguration = buildMakeConfiguration();
const makeUser = buildMakeUser();
const makeImage = buildMakeImage();
const makeImages = buildMakeImages({ makeImage });
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
const makeReservation = buildMakeReservation();

export {
  makeConfiguration,
  makeUser,
  makeEstablishment,
  makeImages,
  makeWorkingHours,
  makeTable,
  makeTables,
  makeImage,
  makeLocation,
  makeReservation,
};
