import {
  addReservation,
  fetchOwnersEstablishmentsReservationsByStatus,
} from '../../use-cases';
import makeExpressCallback from '../../adapters/expressCallback';
import makePostReservation from './postReservation';
import makeGetOwnersEstablishmentsReservationsByStatus from './getOwnersEstablishmentsReservationsByStatus';

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
  return Object.freeze({
    Post,
    GetByOwnerAndStatus,
  });
}
