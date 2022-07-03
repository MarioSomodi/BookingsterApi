import { makeReservation } from '../../entities';

export default function makeFetchOwnersEstablishmentsReservationsByStatus({
  CRUDDb,
  establishmentsCollection,
  usersReservationsCollection,
}) {
  return async function fetchOwnersEstablishmentsReservationsByStatus({
    owner,
    status,
  }) {
    const reservations = await CRUDDb.getDocumentsFromCollectionByPropertyValue(
      {
        collection: usersReservationsCollection,
        propertyName: 'establishmentOwner',
        propertyValue: owner,
      }
    );
    const ownersEstablishmentsReservations = [];
    await Promise.all(
      reservations
        .filter((r) => r.status === Number(status))
        .map(async (reservationFB) => {
          const establishments =
            await CRUDDb.getDocumentsFromCollectionByPropertyValue({
              collection: establishmentsCollection,
              propertyName: 'oib',
              propertyValue: reservationFB.establishmentOIB,
            });
          const { 0: establishment } = establishments;
          reservationFB.establishment = establishment;
          const reservation = makeReservation(reservationFB, 'get');
          ownersEstablishmentsReservations.push({
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
            id: reservation.getId(),
          });
        })
    );
    return ownersEstablishmentsReservations;
  };
}
