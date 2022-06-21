import logger from '../../logger';

export default function makeGetUser({ fetchUserInfo }) {
  return async function postUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const { UID } = httpRequest.query;
      const user = await fetchUserInfo({ UID });
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
