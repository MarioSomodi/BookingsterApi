import logger from '../../logger';

export default function makeGetUsersReservationsByStatus({
  fetchUsersReservationsByStatus,
}) {
  return async function getUsersReservationsByStatus(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const { UID, status } = httpRequest.query;
      const reservations = await fetchUsersReservationsByStatus({
        UID,
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
