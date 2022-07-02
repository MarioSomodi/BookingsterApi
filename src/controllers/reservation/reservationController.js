import { addReservation } from '../../use-cases';
import makeExpressCallback from '../../adapters/expressCallback';
import makePostReservation from './postReservation';

export default function makeReservationController() {
  function Post() {
    const postReservation = makePostReservation({ addReservation });
    return makeExpressCallback(postReservation);
  }
  return Object.freeze({
    Post,
  });
}
