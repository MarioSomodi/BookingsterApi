import {
  addReservation,
  fetchOwnersEstablishmentsReservationsByStatus,
  fetchUsersReservationsByStatus,
} from '../../use-cases';
import makeExpressCallback from '../../adapters/expressCallback';
import makePostReservation from './postReservation';
import makeGetOwnersEstablishmentsReservationsByStatus from './getOwnersEstablishmentsReservationsByStatus';
import makeGetUsersReservationsByStatus from './getUsersReservationsByStatus';

export default function makeReservationController() {
  function Post() {
    const postReservation = makePostReservation({ addReservation });
    return makeExpressCallback(postReservation);
  }
  function GetByOwnerAndStatus() {
    const getOwnersEstablishmentsReservationsByStatus =
      makeGetOwnersEstablishmentsReservationsByStatus({
        fetchOwnersEstablishmentsReservationsByStatus,
      });
    return makeExpressCallback(getOwnersEstablishmentsReservationsByStatus);
  }
  function GetByUserAndStatus() {
    const getUsersReservationsByStatus = makeGetUsersReservationsByStatus({
      fetchUsersReservationsByStatus,
    });
    return makeExpressCallback(getUsersReservationsByStatus);
  }
  return Object.freeze({
    Post,
    GetByOwnerAndStatus,
    GetByUserAndStatus,
  });
}
