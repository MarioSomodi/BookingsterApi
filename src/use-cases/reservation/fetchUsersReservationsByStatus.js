import { makeReservation } from '../../entities';

export default function makeFetchUsersReservationsByStatus({
  CRUDDb,
  establishmentsCollection,
  usersReservationsCollection,
}) {
  return async function fetchUsersReservationsByStatus({ UID, status }) {
    const reservations = await CRUDDb.getDocumentsFromCollectionByPropertyValue(
      {
        collection: usersReservationsCollection,
        propertyName: 'reservedBy',
        propertyValue: UID,
      }
    );
    const usersReservations = [];
    await Promise.all(
      reservations
        .filter((r) => r.status === Number(status))
        .map(async (reservationFB) => {
          const establishment =
            await CRUDDb.getDocumentsFromCollectionByPropertyValue({
              collection: establishmentsCollection,
              propertyName: 'oib',
              propertyValue: reservationFB.establishmentOIB,
            });
          reservationFB.establishment = establishment;
          const reservation = makeReservation(reservationFB, 'get');
          usersReservations.push({
            establishment: reservation.getEstablishment(),
            establishmentOIB: reservation.getEstablishmentOIB(),
            establishmentOwner: reservation.getEstablishmentOwner(),
            nameOnReservation: reservation.getNameOnReservation(),
            places: reservation.getPlaces(),
            reservedBy: reservation.getReservedBy(),
            reservedFrom: reservation.getReservedFrom(),
            reservedTo: reservation.getReservedTo(),
            status: reservation.getStatus(),
            tablesReserved: reservation.getTablesReserved(),
          });
        })
    );
    return usersReservations;
  };
}
