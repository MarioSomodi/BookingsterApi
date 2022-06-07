import logger from '../../logger';
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
      logger({ errorMessage: e.message, fullErrorTrace: e.stack });
      return {
        headers,
        statusCode: 400,
        body: {
          errorMessage: e.message,
          fullErrorTrace: e.stack,
        },
      };
    }
  };
}
