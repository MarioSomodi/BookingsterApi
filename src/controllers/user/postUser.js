export default function makePostUser({ createUser }) {
  return async function postUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const userInfo = httpRequest.body;
      const user = await createUser({ userInfo });
      return {
        headers,
        statusCode: 201,
        body: { user },
      };
    } catch (e) {
      //TODO error logging
      console.log(e);
      return {
        headers,
        statusCode: 400,
        body: {
          errorMessage: e.message,
          fullErrorTrace: e,
        },
      };
    }
  };
}
