export default function makeConfigurationDb({ configurationCollection }) {
  async function findByType({ type } = {}) {
    const queryResult = await configurationCollection
      .where('type', '==', type)
      .limit(1)
      .get();
    if (queryResult.empty) {
      return null;
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
