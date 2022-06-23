export default function makeAuthenticationActions({ auth } = {}) {
  async function getUsersEmail({ UID }) {
    const user = await auth.getUser(UID);
    return user.email;
  }
  return Object.freeze({
    getUsersEmail,
  });
}
