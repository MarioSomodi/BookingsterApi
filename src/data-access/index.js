import makeConfigurationDb from "./configuration/configurationDb";
import getDb from "./database";

const db = getDb();

const configurationCollection = db.collection("configuration");
const configurationDb = makeConfigurationDb({ configurationCollection });
export { configurationDb };
