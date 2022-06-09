export default function makeCRUDDb() {
  async function insertIntoCollectionById({ collection, data, id } = {}) {
    const dataRef = collection.doc(String(id));
    await dataRef.set(data);
    const doc = await dataRef.get();
    return doc.data();
  }
  async function insertIntoCollectionByAutoId({ collection, data } = {}) {
    const dataRef = collection.doc();
    await dataRef.set(data);
    const doc = await dataRef.get();
    return doc.data();
  }
  async function getAllFromCollection({ collection } = {}) {
    const snapshot = await collection.get();
    const docList = [];
    snapshot.forEach((doc) => {
      if (doc.id != 'root') docList.push(doc.data());
    });
    return docList;
  }
  return Object.freeze({
    insertIntoCollectionById,
    getAllFromCollection,
    insertIntoCollectionByAutoId,
  });
}
