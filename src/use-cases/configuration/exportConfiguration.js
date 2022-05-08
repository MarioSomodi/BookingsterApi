import { makeConfiguration } from '../../entities';
export default function makeExportConfiguration({ configurationDb }) {
  return async function exportConfiguration() {
    const webClientId = await configurationDb.findByType({
      type: 'webClientId',
    });
    const configuration = makeConfiguration({ webClientId });
    return configuration;
  };
}
