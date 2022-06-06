import { makeUser } from '../../entities';
export default function makeCreateUser({ usersCollection, CRUDDb }) {
  return async function createUser({ userInfo }) {
    const user = makeUser(userInfo);
    return await CRUDDb.insertIntoCollectionById({
      collection: usersCollection,
      data: {
        fullName: user.getFullName(),
        lastname: user.getLastname(),
        name: user.getName(),
        typeId: user.getAccountType(),
      },
      id: user.getUID(),
    });
  };
}
