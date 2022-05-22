// export default function makeUsersDb({ usersCollection, getAuthentication }) {
//   async function checkRoleAndGiveClaim({ UID, value } = {}) {
//     const userRef = await usersCollection.doc(UID);
//     const userSnapshot = await userRef.get();
//     if (!userSnapshot.exists) {
//       throw new Error(
//         'Korisnik sa poslanim identifikacijskim brojem ne postoji.'
//       );
//     }
//     var user = userSnapshot.data();
//     if (user.role === value) {
//       auth = getAuthentication();
//       auth.setCustomUserClaims(UID, { admin: true });
//       return true;
//     }
//     return false;
//   }
//   return Object.freeze({
//     checkRoleAndGiveClaim,
//   });
// }
