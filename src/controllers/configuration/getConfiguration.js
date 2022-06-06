export default function makeGetConfiguration({ exportConfiguration }) {
  return async function getConfiguration() {
    const headers = {
      'Content-Type': 'application/json',
    };
    try {
      const configuration = await exportConfiguration();
      return {
        headers,
        statusCode: 200,
        body: { googleClientId: configuration.getWebClientId() },
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
