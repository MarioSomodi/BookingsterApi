import { makeEstablishment } from '../../entities';

export default function makeCreateEstablishment({
  establishmentsCollection,
  CRUDDb,
}) {
  return async function createEstablishment({ establishmentInfo }) {
    const establishment = makeEstablishment(establishmentInfo);
    const insertedEstablishment = await CRUDDb.insertIntoCollectionById({
      collection: establishmentsCollection,
      data: {
        phoneNumber: establishment.getPhoneNumber(),
        images: establishment.getImages(),
        location: establishment.getLocation(),
        name: establishment.getName(),
        numberOfReservations: establishment.getNumberOfReservations(),
        oib: establishment.getOIB(),
        workingHours: establishment.getWorkingHours(),
      },
      id: establishment.getOIB(),
    });
    return insertedEstablishment;
  };
}
