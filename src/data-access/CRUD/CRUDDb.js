export default function makeCRUDDb() {
  async function insertIntoCollectionById({ collection, data, id } = {}) {
    const dataRef = collection.doc(id);
    await dataRef.set(data);
    const doc = await dataRef.get();
    return doc.data();
  }
  return Object.freeze({
    insertIntoCollectionById,
  });
}
