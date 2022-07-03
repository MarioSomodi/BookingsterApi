export default function makeChangeReservationStatus({
  CRUDDb,
  usersReservationsCollection,
  establishmentsCollection,
}) {
  return async function changeReservationStatus({
    newStatus,
    reservationId,
    establishmentOIB,
  }) {
    if (
      !(await CRUDDb.checkIfDocWithIdExistsInCollection({
        collection: usersReservationsCollection,
        id: reservationId,
      }))
    ) {
      throw Error('Rezervacija koju želite ažurirati ne postoji');
    }
    const updateSuccess = await CRUDDb.updateDocumentFromCollectionById({
      collection: usersReservationsCollection,
      updatedData: { status: Number(newStatus) },
      id: reservationId,
    });
    if (Number(newStatus) === 1) {
      console.log(establishmentOIB, typeof establishmentOIB);
      const establishment = await CRUDDb.getDocumentFromCollectionById({
        collection: establishmentsCollection,
        id: establishmentOIB,
      });
      await CRUDDb.updateDocumentFromCollectionById({
        collection: establishmentsCollection,
        updatedData: {
          numberOfReservations: establishment.numberOfReservations + 1,
        },
        id: establishmentOIB,
      });
    }
    return updateSuccess;
  };
}
