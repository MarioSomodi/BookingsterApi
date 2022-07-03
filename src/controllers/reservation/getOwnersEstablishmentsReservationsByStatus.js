import logger from '../../logger';

export default function makeGetOwnersEstablishmentsReservationsByStatus({
  fetchOwnersEstablishmentsReservationsByStatus,
}) {
  return async function getOwnersEstablishmentsReservationsByStatus(
    httpRequest
  ) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const { owner, status } = httpRequest.query;
      const reservations = await fetchOwnersEstablishmentsReservationsByStatus({
        owner,
        status,
      });
      return {
        headers,
        statusCode: 200,
        body: { reservations: reservations },
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
