import logger from '../../logger';

export default function makeGetEstablishments({ listEstablishment }) {
  return async function getEstablishments() {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const establishments = await listEstablishment();
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
