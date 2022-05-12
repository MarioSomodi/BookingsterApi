export default function makeConfigurationDb({ configurationCollection }) {
  async function findByType({ type } = {}) {
    const queryResult = await configurationCollection
      .where('type', '==', type)
      .limit(1)
      .get();
    if (queryResult.empty) {
      throw new Error(
        `Konfiguracijski objekt sa definiranim tipom <${type}> ne postoji`
      );
    }
    var result = null;
    queryResult.forEach((doc) => {
      result = doc.data();
    });
    return result.value;
  }
  return Object.freeze({
    findByType,
  });
}
