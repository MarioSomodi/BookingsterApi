import { makeUser } from '../../entities';

export default function makeCreateUser({
  usersCollection,
  CRUDDb,
  authenticationActions,
}) {
  return async function createUser({ userInfo }) {
    if (
      await CRUDDb.checkIfDocWithIdExistsInCollection({
        collection: usersCollection,
        id: userInfo.UID,
      })
    ) {
      throw Error('Korisnik sa tim identifikacijskim brojem vec postoji.');
    }
    const email = await authenticationActions.getUsersEmail({
      UID: userInfo.UID,
    });
    userInfo.email = email;
    const user = makeUser(userInfo);
    const data = {
      fullName: user.getFullName(),
      lastname: user.getLastname(),
      name: user.getName(),
      accountType: user.getAccountType(),
      UID: user.getUID(),
      email: user.getEmail(),
      photoURL: user.getPhotoURL(),
    };
    if (user.getAuthType() === 'emailpassword') {
      data.isNewUser = user.getIsNewUser();
    }
    const insertedUser = await CRUDDb.insertIntoCollectionById({
      collection: usersCollection,
      data,
      id: user.getUID(),
    });
    return insertedUser;
  };
}
