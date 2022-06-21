import { exportConfiguration } from '../../use-cases';
import makeGetConfiguration from './getConfiguration';
import makeExpressCallback from '../../adapters/expressCallback';

export default function makeConfigurationController() {
  function Get() {
    const getConfiguration = makeGetConfiguration({ exportConfiguration });
    return makeExpressCallback(getConfiguration);
  }
  return Object.freeze({
    Get,
  });
}
