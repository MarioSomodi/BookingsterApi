import { makeUser } from '../../entities';

export default function makeFetchUserInfo({ usersCollection, CRUDDb }) {
  return async function fetchUserInfo({ UID }) {
    const userInfo = await CRUDDb.getDocumentFromCollectionById({
      collection: usersCollection,
      id: UID,
    });
    const user = makeUser({ ...userInfo, UID: UID, authType: 'emailpassword' });
    return {
      fullName: user.getFullName(),
      lastname: user.getLastname(),
      name: user.getName(),
      accountType: user.getAccountType(),
      UID: user.getUID(),
      email: user.getEmail(),
      photoURL: user.getPhotoURL(),
      authType: user.getAuthType(),
    };
  };
}
