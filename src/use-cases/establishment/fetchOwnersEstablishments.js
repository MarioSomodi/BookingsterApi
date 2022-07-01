import { makeEstablishment } from '../../entities';

export default function makeFetchOwnersEstablishments({
  establishmentsCollection,
  CRUDDb,
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
    establishments = establishments.map((establishment) => {
      const est = makeEstablishment(establishment, 'get');
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
    });
    return establishments;
  };
}
