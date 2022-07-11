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
    const reservation = await CRUDDb.getDocumentFromCollectionById({
      collection: usersReservationsCollection,
      id: reservationId,
    });
    let reservations = await CRUDDb.getAllFromCollection({
      collection: usersReservationsCollection,
    });
    reservations = reservations.filter((x) => x.id !== reservation.id);
    if (
      Number(newStatus) === 1 &&
      reservations.some(
        (r) =>
          r.tablesReserved[0] === reservation.tablesReserved[0] &&
          r.status === 1
      )
    ) {
      throw Error(
        'Nije moguće odobriti rezervaciju zato sto je prije odobrena rezervacija koja ima iste stolove'
      );
    }
    const updateSuccess = await CRUDDb.updateDocumentFromCollectionById({
      collection: usersReservationsCollection,
      updatedData: { status: Number(newStatus) },
      id: reservationId,
    });
    if (Number(newStatus) === 1) {
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
