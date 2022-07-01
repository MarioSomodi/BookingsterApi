import logger from '../../logger';

export default function makeGetOwnersEstablishments({
  fetchOwnersEstablishments,
}) {
  return async function getOwnersEstablishments(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const { UID } = httpRequest.query;
      const establishments = await fetchOwnersEstablishments({ UID });
      return {
        headers,
        statusCode: 200,
        body: { establishments: establishments },
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
