export default function makeChangeReservationStatus({
  CRUDDb,
  usersReservationsCollection,
}) {
  return async function changeReservationStatus({ newStatus, reservationId }) {
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
    return updateSuccess;
  };
}
