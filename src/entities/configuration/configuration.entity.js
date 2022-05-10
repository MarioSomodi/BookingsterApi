export default function buildMakeConfiguration() {
  return function makeConfiguration({ webClientId } = {}) {
    if (!webClientId || webClientId.trim().length < 1) {
      throw new Error('Web client ID mora biti poslan.');
    }
    return Object.freeze({
      getWebClientId: () => webClientId,
    });
  };
}
