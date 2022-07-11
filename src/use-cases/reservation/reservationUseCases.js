import {
  CRUDDb,
  establishmentsCollection,
  establishmentsTablesCollection,
  usersReservationsCollection,
} from '../../data-access';
import makeAddReservation from './addReservation';
import makeChangeReservationStatus from './changeReservationStatus';
import makeFetchOwnersEstablishmentsReservationsByStatus from './fetchOwnersEstablishmentsReservationsByStatus';
import makeFetchUsersReservationsByStatus from './fetchUsersReservationsByStatus';

export default function makeReservationUseCases() {
  const fetchOwnersEstablishmentsReservationsByStatus =
    makeFetchOwnersEstablishmentsReservationsByStatus({
      CRUDDb,
      establishmentsCollection,
      usersReservationsCollection,
    });
  const addReservation = makeAddReservation({
    CRUDDb,
    establishmentsTablesCollection,
    usersReservationsCollection,
    establishmentsCollection,
  });
  const fetchUsersReservationsByStatus = makeFetchUsersReservationsByStatus({
    CRUDDb,
    establishmentsCollection,
    usersReservationsCollection,
  });
  const changeReservationStatus = makeChangeReservationStatus({
    CRUDDb,
    usersReservationsCollection,
    establishmentsCollection,
  });
  return Object.freeze({
    fetchOwnersEstablishmentsReservationsByStatus,
    addReservation,
    fetchUsersReservationsByStatus,
    changeReservationStatus,
  });
}
