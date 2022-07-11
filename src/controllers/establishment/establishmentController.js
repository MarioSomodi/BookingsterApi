import { establishmentUseCases } from '../../use-cases';
import makeGetEstablishments from './getEstablishments';
import makePostEstablishment from './postEstablishment';
import makeExpressCallback from '../../adapters/expressCallback';
import makeGetOwnersEstablishments from './getOwnersEstablishments';

export default function makeEstablishmentController() {
  function Get() {
    const getEstablishments = makeGetEstablishments({
      listEstablishment: establishmentUseCases.listEstablishment,
    });
    return makeExpressCallback(getEstablishments);
  }
  function GetByOwner() {
    const getOwnersEstablishments = makeGetOwnersEstablishments({
      fetchOwnersEstablishments:
        establishmentUseCases.fetchOwnersEstablishments,
    });
    return makeExpressCallback(getOwnersEstablishments);
  }
  function Post() {
    const postEstablishment = makePostEstablishment({
      createEstablishment: establishmentUseCases.createEstablishment,
    });
    return makeExpressCallback(postEstablishment);
  }
  return Object.freeze({
    Get,
    GetByOwner,
    Post,
  });
}
