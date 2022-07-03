export default function buildMakeUser() {
  return function makeUser({
    name,
    lastname,
    authType,
    accountType,
    UID,
    photoURL,
    email,
  } = {}) {
    if (!UID || UID.trim().length < 1) {
      throw new Error('Korisnikov identifikacijski broj mora biti poslan.');
    }
    if (!email || email.trim().length < 1) {
      throw new Error('Email mora biti poslan.');
    }
    if (!authType || authType.trim().length < 1) {
      throw new Error('Tip autentifikacije mora biti poslan.');
    }
    if (accountType < 0 || accountType > 1) {
      throw new Error(
        'Tip računa mora biti poslan, može biti Korisnik(0) ili Ugostitelj(1).'
      );
    }
    if (!name || name.trim().length < 1) {
      throw new Error('Ime mora biti poslano.');
    }
    if ((!lastname || lastname.trim().length < 1) && authType !== 'google') {
      throw new Error('Prezime mora biti poslano.');
    }
    if (authType === 'google') {
      const splitName = name.split(' ');
      if (splitName.length !== 2) {
        throw new Error(
          'Google korisnik mora imati ime i prezime u name varijabli.'
        );
      }
      const { 0: fN, 1: lN } = splitName;
      name = fN;
      lastname = lN;
    }
    return Object.freeze({
      getName: () => name,
      getUID: () => UID,
      getLastname: () => lastname,
      getAuthType: () => authType,
      getFullName: () => `${name} ${lastname}`,
      getAccountType: () => Number(accountType),
      getPhotoURL: () => photoURL,
      getEmail: () => email,
      getIsNewUser: () => true,
    });
  };
}
