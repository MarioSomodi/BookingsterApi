import { makeEstablishment } from '../../entities';

export default function makeListEstablishment({
  establishmentsCollection,
  CRUDDb,
  establishmentsTablesCollection,
  usersReservationsCollection,
}) {
  return async function listEstablishment() {
    const establishments = await CRUDDb.getAllFromCollection({
      collection: establishmentsCollection,
    });
    const listEstablishments = [];
    await Promise.all(
      establishments.map(async (establishment) => {
        const establishmentsTables = await CRUDDb.getDocumentFromCollectionById(
          { collection: establishmentsTablesCollection, id: establishment.oib }
        );
        const userReservations =
          await CRUDDb.getDocumentsFromCollectionByPropertyValue({
            collection: usersReservationsCollection,
            propertyName: 'establishmentOIB',
            propertyValue: establishment.oib,
          });
        establishment.tables = establishmentsTables.tables;
        const est = makeEstablishment(establishment, userReservations, 'get');
        listEstablishments.push({
          owner: est.getOwner(),
          name: est.getName(),
          phoneNumber: est.getPhoneNumber(),
          location: est.getLocation(),
          images: est.getImages(),
          numberOfReservations: est.getNumberOfReservations(),
          oib: est.getOIB(),
          workingHours: est.getWorkingHours(),
          tables: est.getTables(),
        });
      })
    );
    return listEstablishments;
  };
}
