import makeExportConfiguration from "./configuration/exportConfiguration";
import { configurationDb } from "../data-access";
const exportConfiguration = makeExportConfiguration({ configurationDb });

export { exportConfiguration };
