import {
  addReservation,
  fetchOwnersEstablishmentsReservationsByStatus,
  fetchUsersReservationsByStatus,
  changeReservationStatus,
} from '../../use-cases';
import makeExpressCallback from '../../adapters/expressCallback';
import makePostReservation from './postReservation';
import makeGetOwnersEstablishmentsReservationsByStatus from './getOwnersEstablishmentsReservationsByStatus';
import makeGetUsersReservationsByStatus from './getUsersReservationsByStatus';
import makePatchReservationStatus from './patchReservationStatus';

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
  function PatchReservationStatus() {
    const patchReservationStatus = makePatchReservationStatus({
      changeReservationStatus,
    });
    return makeExpressCallback(patchReservationStatus);
  }
  return Object.freeze({
    Post,
    GetByOwnerAndStatus,
    GetByUserAndStatus,
    PatchReservationStatus,
  });
}
