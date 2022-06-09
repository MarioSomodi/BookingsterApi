import { makeEstablishment } from '../../entities';
export default function makeListEstablishment({
  establishmentsCollection,
  CRUDDb,
}) {
  return async function listEstablishment() {
    const establishments = await CRUDDb.getAllFromCollection({
      collection: establishmentsCollection,
    });
    const listEstablishments = [];
    establishments.forEach((establishment) => {
      const est = makeEstablishment(establishment);
      listEstablishments.push({
        name: est.getName(),
        phoneNumber: est.getPhoneNumber(),
        location: est.getLocation(),
        images: est.getImages(),
        numberOfReservations: est.getNumberOfReservations(),
        oib: est.getOIB(),
        workingHours: est.getWorkingHours(),
      });
    });
    return listEstablishments;
  };
}
