export default function buildMakeEstablishment() {
  return function makeEstablishment({
    location,
    name,
    numberOfReservations,
    oib,
    workingHours,
  }) {
    var { address, city, country, geoCords } = location;
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
    if (!oib) {
      throw new Error('OIB objekta mora biti poslan.');
    }
    if (!workingHours || workingHours.length < 1) {
      throw new Error('Radno vrijeme objekta mora biti poslano.');
    }
    return Object.freeze({
      getName: () => name,
      getOIB: () => oib,
      getLocation: () => location,
      getWorkingHours: () => workingHours,
      getNumberOfReservations: () => numberOfReservations,
    });
  };
}
