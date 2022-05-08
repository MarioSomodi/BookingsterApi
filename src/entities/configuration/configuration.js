export default function buildMakeConfiguration() {
  return function makeConfiguration({ webClientId } = {}) {
    if (!webClientId || webClientId.length < 1) {
      throw new Error("Web client ID must be supplied.");
    }
    return Object.freeze({
      getWebClientId: () => webClientId,
    });
  };
}
