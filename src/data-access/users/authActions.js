export default function makeAuthActions({ auth } = {}) {
  async function getUsersEmail({ UID }) {
    const user = await auth.getUser(UID);
    return user.email;
  }
  return Object.freeze({
    getUsersEmail,
  });
}
