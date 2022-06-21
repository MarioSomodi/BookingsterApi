import { makeUser } from '../../entities';

export default function makeCreateUser({
  usersCollection,
  CRUDDb,
  authActions,
}) {
  return async function createUser({ userInfo }) {
    const email = await authActions.getUsersEmail({ UID: userInfo.UID });
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
