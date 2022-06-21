import { createUser, fetchUserInfo } from '../../use-cases';
import makeExpressCallback from '../../adapters/expressCallback';
import makeGetUser from './getUser';
import makePostUser from './postUser';

export default function makeUserController() {
  function Get() {
    const getUser = makeGetUser({ fetchUserInfo });
    return makeExpressCallback(getUser);
  }
  function Post() {
    const postUser = makePostUser({ createUser });
    return makeExpressCallback(postUser);
  }
  return Object.freeze({
    Get,
    Post,
  });
}
