import makeConfiguration from 'entities/configuration';
export default makeExportConfiguration = ({ configurationDb }) => {
  return (exportConfiguration = async () => {
    const webClientId = await configurationDb.findByType('webClientId');
    const configuration = makeConfiguration(webClientId);
    return configuration;
  });
};
