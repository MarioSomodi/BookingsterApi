export default function buildMakeLocation() {
  return function makeLocation({ address, city, country, geoCords } = {}) {
    if (!address || address.trim().length < 1) {
      throw new Error('Adresa objekta mora biti poslana.');
    }
    if (!city || city.trim().length < 1) {
      throw new Error('Grad u kojem se objekt nalazi mora biti poslan.');
    }
    if (!country || country.trim().length < 1) {
      throw new Error('Država u kojoj se objekt nalazi mora biti poslana.');
    }
    return Object.freeze({
      getAddress: () => address,
      getCity: () => city,
      getCountry: () => country,
      getGeoCords: () => geoCords,
    });
  };
}
