import {
  CRUDDb,
  usersCollection,
  authenticationActions,
} from '../../data-access';
import makeCreateUser from './createUser';
import makeFetchUserInfo from './fetchUserInfo';

export default function makeUserUseCases() {
  const createUser = makeCreateUser({
    usersCollection,
    CRUDDb,
    authenticationActions,
  });

  const fetchUserInfo = makeFetchUserInfo({
    usersCollection,
    CRUDDb,
  });
  return Object.freeze({ createUser, fetchUserInfo });
}
