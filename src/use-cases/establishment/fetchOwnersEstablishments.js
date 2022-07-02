import { makeEstablishment } from '../../entities';

export default function makeFetchOwnersEstablishments({
  establishmentsCollection,
  CRUDDb,
  usersReservationsCollection,
  establishmentsTablesCollection,
}) {
  return async function fetchOwnersEstablishments({ UID }) {
    if (
      !(await CRUDDb.checkIfDocumentWithPropertyValueExistsInCollection({
        collection: establishmentsCollection,
        propertyName: 'owner',
        propertyValue: UID,
      }))
    ) {
      throw Error('Vlasnik trenutno nema niti jedan objekt.');
    }
    let establishments = await CRUDDb.getDocumentsFromCollectionByPropertyValue(
      {
        collection: establishmentsCollection,
        propertyName: 'owner',
        propertyValue: UID,
      }
    );
    establishments = await Promise.all(
      establishments.map(async (establishment) => {
        const establishmentsTables = await CRUDDb.getDocumentFromCollectionById(
          { collection: establishmentsTablesCollection, id: establishment.oib }
        );
        establishment.tables = establishmentsTables.tables;
        const usersReservations =
          await CRUDDb.getDocumentsFromCollectionByPropertyValue({
            collection: usersReservationsCollection,
            propertyName: 'establishmentOIB',
            propertyValue: establishment.oib,
          });
        const est = makeEstablishment(establishment, usersReservations, 'get');
        return {
          images: est.getImages(),
          location: est.getLocation(),
          name: est.getName(),
          numberOfReservations: est.getNumberOfReservations(),
          oib: est.getOIB(),
          owner: est.getOwner(),
          phoneNumber: est.getPhoneNumber(),
          workingHours: est.getWorkingHours(),
          tables: est.getTables(),
        };
      })
    );
    return establishments;
  };
}
