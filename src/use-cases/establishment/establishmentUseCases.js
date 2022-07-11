import {
  usersCollection,
  CRUDDb,
  establishmentsCollection,
  establishmentsTablesCollection,
  storageActions,
  usersReservationsCollection,
} from '../../data-access';
import makeCreateEstablishment from './createEstablishment';
import makeFetchOwnersEstablishments from './fetchOwnersEstablishments';
import makeListEstablishments from './listEstablishments';

export default function makeEstablishmentUseCases() {
  const createEstablishment = makeCreateEstablishment({
    establishmentsCollection,
    establishmentsTablesCollection,
    CRUDDb,
    storageActions,
    usersCollection,
  });
  const fetchOwnersEstablishments = makeFetchOwnersEstablishments({
    establishmentsCollection,
    CRUDDb,
    usersReservationsCollection,
    establishmentsTablesCollection,
  });

  const listEstablishment = makeListEstablishments({
    establishmentsCollection,
    CRUDDb,
    establishmentsTablesCollection,
    usersReservationsCollection,
  });
  return Object.freeze({
    createEstablishment,
    fetchOwnersEstablishments,
    listEstablishment,
  });
}
