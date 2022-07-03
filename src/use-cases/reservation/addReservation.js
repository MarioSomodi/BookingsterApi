import { makeReservation, makeTables } from '../../entities';

export default function makeAddReservation({
  CRUDDb,
  establishmentsTablesCollection,
  usersReservationsCollection,
  establishmentsCollection,
}) {
  function formatReservation(reservation) {
    return {
      establishmentOIB: reservation.getEstablishmentOIB(),
      establishmentOwner: reservation.getEstablishmentOwner(),
      reservedBy: reservation.getReservedBy(),
      nameOnReservation: reservation.getNameOnReservation(),
      reservedFrom: reservation.getReservedFrom(),
      reservedTo: reservation.getReservedTo(),
      places: reservation.getPlaces(),
      tablesReserved: reservation.getTablesReserved(),
      status: reservation.getStatus(),
    };
  }
  return async function addReservation({ reservationInfo }) {
    let reservationToInsert = null;
    let reservation = makeReservation(reservationInfo, 'post');
    const { tables: establishmentsTables } =
      await CRUDDb.getDocumentFromCollectionById({
        collection: establishmentsTablesCollection,
        id: reservation.getEstablishmentOIB(),
      });

    const establishment = await CRUDDb.getDocumentFromCollectionById({
      collection: establishmentsCollection,
      id: reservation.getEstablishmentOIB(),
    });
    const dayOfReservation =
      reservation.getReservedFrom().getUTCDay() === 0
        ? 6
        : reservation.getReservedFrom().getUTCDay() - 1;
    const workingHoursTheDayOfReservation = establishment.workingHours.filter(
      (wH) => wH.index === dayOfReservation
    )[0];

    if (!workingHoursTheDayOfReservation) {
      throw Error('Rezervacija nije moguća na neradni dan');
    }

    const dateTo = new Date(
      Date.UTC(
        reservation.getReservedFrom().getUTCFullYear(),
        reservation.getReservedFrom().getUTCMonth(),
        reservation.getReservedFrom().getUTCDate(),
        Number(workingHoursTheDayOfReservation.timeTo.split(':')[0]),
        Number(workingHoursTheDayOfReservation.timeTo.split(':')[1])
      )
    );

    const establishmentStartsWorkingOnDateOfReservation = new Date(
      Date.UTC(
        reservation.getReservedFrom().getUTCFullYear(),
        reservation.getReservedFrom().getUTCMonth(),
        reservation.getReservedFrom().getUTCDate(),
        Number(workingHoursTheDayOfReservation.timeFrom.split(':')[0]),
        Number(workingHoursTheDayOfReservation.timeFrom.split(':')[1])
      )
    );
    if (
      reservation.getReservedFrom() > dateTo ||
      reservation.getReservedFrom() <
        establishmentStartsWorkingOnDateOfReservation
    ) {
      throw Error('Vrijeme rezervacije ne smije biti izvan radnog vremena.');
    }

    reservationInfo.reservedTo = dateTo;
    reservationInfo.establishment = establishment;
    const reservations = await CRUDDb.getDocumentsFromCollectionByPropertyValue(
      {
        collection: usersReservationsCollection,
        propertyName: 'establishmentOIB',
        propertyValue: reservation.getEstablishmentOIB(),
      }
    );
    const tablesAvailableForReservation = makeTables(
      'get',
      establishmentsTables,
      reservations
    )
      .getTables()
      .filter((t) => t.reserved === false);

    if (tablesAvailableForReservation.length <= 0) {
      throw Error('Odabrani objekt nema slobodnih stolova.');
    }
    if (
      tablesAvailableForReservation.length === 1 &&
      tablesAvailableForReservation[0].capacity >= reservation.getPlaces()
    ) {
      reservationInfo.tablesReserved = [tablesAvailableForReservation[0].id];
      reservation = makeReservation(reservationInfo, 'post');
      reservationToInsert = formatReservation(reservation);
    } else if (
      tablesAvailableForReservation.length === 1 &&
      tablesAvailableForReservation[0].capacity < reservation.getPlaces()
    ) {
      throw Error('Odabrani objekt nema stol sa dovoljno mjesta.');
    }
    if (
      tablesAvailableForReservation.filter(
        (t) => t.capacity === reservation.getPlaces()
      ).length >= 1
    ) {
      const tablesThatMatchRequiredPlaces =
        tablesAvailableForReservation.filter(
          (t) => t.capacity === reservation.getPlaces()
        );
      reservationInfo.tablesReserved = [tablesThatMatchRequiredPlaces[0].id];
      reservation = makeReservation(reservationInfo, 'post');
      reservationToInsert = formatReservation(reservation);
    }
    if (reservationToInsert !== null) {
      await CRUDDb.insertIntoCollectionByAutoId({
        collection: usersReservationsCollection,
        data: reservationToInsert,
      });
    }
    return {
      ...reservationToInsert,
      establishment: reservation.getEstablishment(),
    };
  };
}
