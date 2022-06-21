import makeExpressCallback from '../adapters/expressCallback';
import notFound from './notFound';

export default function makeApiController() {
  function HandleNotFound() {
    return makeExpressCallback(notFound);
  }
  return Object.freeze({
    HandleNotFound,
  });
}
