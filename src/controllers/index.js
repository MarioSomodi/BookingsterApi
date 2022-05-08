import notFound from "./notFound";
import { exportConfiguration } from "../use-cases";
import makeGetConfiguration from "./configuration/getConfiguration";

const getConfiguration = makeGetConfiguration({ exportConfiguration });

export { getConfiguration, notFound };
