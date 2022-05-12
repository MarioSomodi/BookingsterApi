export default function makeAppointAdminClaim({ usersDb }) {
  return async function appointAdminClaim({ UID }) {
    const isAdmin = await usersDb.checkRoleAndGiveClaim({
      UID: UID,
      value: 'admin',
    });
    return isAdmin;
  };
}
