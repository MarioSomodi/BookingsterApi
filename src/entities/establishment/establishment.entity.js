import isOibValid from '../../utils/oibValidator';
import { checkIfValidPhoneNumber } from '../../utils/validationExpressions';

export default function buildMakeEstablishment({
  makeImages,
  makeWorkingHours,
  makeLocation,
  makeTables,
}) {
  return function makeEstablishment(
    {
      location,
      name,
      numberOfReservations = 0,
      oib,
      images,
      phoneNumber,
      workingHours,
      tables,
      owner,
    },
    usersReservations,
    action
  ) {
    const validatedImages = action === 'post' ? makeImages(images) : null;
    const validatedWorkingHours =
      action === 'post' ? makeWorkingHours(workingHours) : null;
    tables = makeTables(action, tables, usersReservations);
    location = makeLocation(location);
    if (!owner || owner.trim().length < 1) {
      throw new Error('Vlasnik objekta mora biti poslan.');
    }
    if (!name || name.trim().length < 1) {
      throw new Error('Ime objekta mora biti poslano.');
    }
    if (!oib || !isOibValid(oib)) {
      throw new Error('OIB objekta mora biti pravilan.');
    }
    if (!phoneNumber || !checkIfValidPhoneNumber(phoneNumber)) {
      throw new Error('Broj objekta mora biti poslan i pravilan.');
    }
    return Object.freeze({
      getName: () => name,
      // eslint-disable-next-line arrow-body-style
      getImages: () => {
        return action === 'post' ? validatedImages.getImages() : images;
      },
      getOwner: () => owner,
      getImagesForUpload: () => validatedImages.getImagesForUpload(),
      getOIB: () => oib,
      getPhoneNumber: () => phoneNumber,
      getLocation: () => ({
        address: location.getAddress(),
        city: location.getCity(),
        country: location.getCountry(),
        geoCords: location.getGeoCords(),
      }),
      // eslint-disable-next-line arrow-body-style
      getWorkingHours: () => {
        return action === 'post'
          ? validatedWorkingHours.getWorkingHours()
          : workingHours.sort((a, b) => (a.index > b.index ? 1 : -1));
      },
      getTables: () => tables.getTables(),
      getNumberOfReservations: () => Number(numberOfReservations),
    });
  };
}
