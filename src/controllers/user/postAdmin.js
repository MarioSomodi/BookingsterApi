export default function makePostAdmin({ appointAdminClaim }) {
  return async function postAdmin(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const UID = httpRequest.body.uid;
      if (!UID || UID.trim().length < 1)
        throw Error('Korisnikov identifikacijski broj mora biti poslan');
      const isAdmin = await appointAdminClaim({ UID });
      return {
        headers,
        statusCode: isAdmin ? 201 : 403,
        body: {
          message: isAdmin
            ? 'Korisniku je odobren pristup administrativnom sučelju'
            : 'Korisniku nije odobren pristup administrativnom sučelju',
        },
      };
    } catch (e) {
      //TODO error logging
      console.log(e);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
