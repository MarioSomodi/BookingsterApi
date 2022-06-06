export default function makeGetEstablishment({ listEstablishment }) {
  return async function getEstablishment() {
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
