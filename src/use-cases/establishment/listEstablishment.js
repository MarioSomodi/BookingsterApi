import { makeEstablishment } from '../../entities';
export default function makeListEstablishment({
  establishmentsCollection,
  CRUDDb,
}) {
  return async function listEstablishment() {
    console.log(establishmentsCollection);
    const establishments = await CRUDDb.getAllFromCollection({
      collection: establishmentsCollection,
    });
    const listEstablishments = [];
    console.log(establishments);
    establishments.forEach((establishment) => {
      const est = makeEstablishment(establishment);
      listEstablishments.push({
        name: est.getName(),
        location: est.getLocation(),
        numberOfReservations: est.getNumberOfReservations(),
        oib: est.getOIB(),
        workingHours: est.getWorkingHours(),
      });
    });
    return listEstablishments;
  };
}
