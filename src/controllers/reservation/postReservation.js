import logger from '../../logger';

export default function makePostReservation({ addReservation }) {
  return async function postReservation(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const reservationInfo = httpRequest.body;
      const reservation = await addReservation({ reservationInfo });
      return {
        headers,
        statusCode: 200,
        body: { reservation: reservation },
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
