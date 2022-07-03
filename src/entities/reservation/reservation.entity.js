import isOibValid from '../../utils/oibValidator';
import { checkIfValidDateSent } from '../../utils/validationExpressions';

export default function buildMakeReservation() {
  return function makeReservation(
    {
      establishmentOIB,
      establishmentOwner,
      reservedBy,
      reservedFrom,
      places,
      nameOnReservation,
      tablesReserved = [],
      reservedTo = null,
      establishment = null,
      status = 0,
    },
    action
  ) {
    if (!establishmentOIB || !isOibValid(establishmentOIB)) {
      throw new Error('Objektov oib mora biti poslan i pravilan.');
    }
    if (!establishmentOwner || establishmentOwner.trim().length < 1) {
      throw new Error('Vlasnik objekta mora biti poslan.');
    }
    if (!reservedBy || reservedBy.trim().length < 1) {
      throw new Error('Osoba koja rezervira mora biti poslana.');
    }
    if (!nameOnReservation || nameOnReservation.trim().length < 1) {
      throw new Error('Puno ime osobe koja rezervira mora biti poslano.');
    }
    if (action === 'post') {
      if (!checkIfValidDateSent(reservedFrom, false)) {
        throw new Error(
          'Datum i vrijeme početka rezervacije mora biti poslano i pravilno.'
        );
      }
      reservedFrom = new Date(
        Date.UTC(
          reservedFrom.year,
          reservedFrom.month,
          reservedFrom.day,
          reservedFrom.hours,
          reservedFrom.minutes
        )
      );
      if (reservedFrom < new Date()) {
        throw Error('Nije dozvoljeno dodati rezervaciju u prošlosti');
      }
    } else {
      reservedFrom = new Date(reservedFrom.seconds * 1000);
      reservedTo = new Date(reservedTo.seconds * 1000);
    }
    if (places <= 0) {
      throw new Error('Najmanji broj mjesta koji se može rezervirati je 1.');
    }
    return Object.freeze({
      getEstablishmentOIB: () => establishmentOIB,
      getEstablishmentOwner: () => establishmentOwner,
      getReservedBy: () => reservedBy,
      getReservedFrom: () => reservedFrom,
      getPlaces: () => Number(places),
      getTablesReserved: () => tablesReserved,
      getNameOnReservation: () => nameOnReservation,
      getReservedTo: () => reservedTo,
      getEstablishment: () => establishment,
      getStatus: () => Number(status),
    });
  };
}
