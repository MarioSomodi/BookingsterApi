import logger from '../../logger';

export default function makePatchReservationStatus({
  changeReservationStatus,
}) {
  return async function patchReservationStatus(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const { newStatus, reservationId } = httpRequest.query;
      const updatedReservation = await changeReservationStatus({
        newStatus,
        reservationId,
      });
      return {
        headers,
        statusCode: 200,
        body: { success: updatedReservation },
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
