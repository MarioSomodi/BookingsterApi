import logger from '../../logger';

export default function makePostEstablishment({ createEstablishment }) {
  return async function postEstablishment(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const establishmentInfo = httpRequest.body;
      const establishment = await createEstablishment({
        establishmentInfo,
      });
      return {
        headers,
        statusCode: 201,
        body: { establishment },
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
