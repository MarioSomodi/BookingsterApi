import isOibValid from '../../adapters/oibValidator';

export default function buildMakeEstablishment() {
  return function makeEstablishment({
    location,
    name,
    numberOfReservations,
    oib,
    images,
    phoneNumber,
    workingHours,
  }) {
    const { address, city, country } = location;
    if (!address || address.trim().length < 1) {
      throw new Error('Adresa objekta mora biti poslana.');
    }
    if (!city || city.trim().length < 1) {
      throw new Error('Grad u kojem se objekt nalazi mora biti poslan.');
    }
    if (!country || country.trim().length < 1) {
      throw new Error('Država u kojoj se objekt nalazi mora biti poslana.');
    }
    if (!name || name.trim().length < 1) {
      throw new Error('Ime objekta mora biti poslano.');
    }
    if (!oib || !isOibValid(oib)) {
      throw new Error('OIB objekta mora biti pravilan.');
    }
    if (!workingHours || workingHours.length < 1) {
      throw new Error('Radno vrijeme objekta mora biti poslano.');
    }
    if (!images || images.length < 1) {
      throw new Error('Objekt mora imati minimalno jednu sliku.');
    }
    return Object.freeze({
      getName: () => name,
      getImages: () => images,
      getOIB: () => oib,
      getPhoneNumber: () => phoneNumber,
      getLocation: () => location,
      getWorkingHours: () => workingHours,
      getNumberOfReservations: () => numberOfReservations,
    });
  };
}
