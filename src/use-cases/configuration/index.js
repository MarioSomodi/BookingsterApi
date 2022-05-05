import makeExportConfiguration from 'use-cases/configuration';
import configurationDb from 'data-access/configuration';

const exportConfiguration = makeExportConfiguration(configurationDb);

export default exportConfiguration;
