export default function buildMakeUser() {
  return function makeUser({
    name,
    lastname,
    authType,
    accountType,
    UID,
  } = {}) {
    if (!UID || UID.trim().length < 1) {
      throw new Error('Korisnikov identifikacijski broj mora biti poslan.');
    }
    if (!authType || authType.trim().length < 1) {
      throw new Error('Tip autentifikacije mora biti poslan.');
    }
    if (!accountType || accountType.trim().length < 1) {
      throw new Error('Tip računa mora biti poslan.');
    }
    if (!name || name.trim().length < 1) {
      throw new Error('Ime mora biti poslano.');
    }
    if ((!lastname || lastname.trim().length < 1) && authType != 'google') {
      throw new Error('Prezime mora biti poslano.');
    }
    if (authType == 'google') {
      let splitName = name.split(' ');
      name = splitName[0];
      lastname = splitName = splitName[1];
    }
    return Object.freeze({
      getName: () => name,
      getUID: () => UID,
      getLastname: () => lastname,
      getAuthType: () => authType,
      getFullName: () => (authType != 'google' ? `${name} ${lastname}` : name),
      getAccountType: () => accountType,
    });
  };
}
