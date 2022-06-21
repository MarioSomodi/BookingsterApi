import { listEstablishment, createEstablishment } from '../../use-cases';
import makeGetEstablishments from './getEstablishments';
import makePostEstablishment from './postEstablishment';
import makeExpressCallback from '../../adapters/expressCallback';

export default function makeEstablishmentController() {
  function Get() {
    const getEstablishments = makeGetEstablishments({ listEstablishment });
    return makeExpressCallback(getEstablishments);
  }
  function Post() {
    const postEstablishment = makePostEstablishment({ createEstablishment });
    return makeExpressCallback(postEstablishment);
  }
  return Object.freeze({
    Get,
    Post,
  });
}
