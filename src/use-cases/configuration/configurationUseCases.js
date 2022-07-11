import makeExportConfiguration from './exportConfiguration';
import { configurationDb } from '../../data-access';

export default function makeConfigurationUseCases() {
  const exportConfiguration = makeExportConfiguration({ configurationDb });
  return Object.freeze({
    exportConfiguration,
  });
}
