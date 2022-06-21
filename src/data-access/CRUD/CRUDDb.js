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
      if (doc.id !== 'root') docList.push(doc.data());
    });
    return docList;
  }
  async function getDocumentFromCollectionById({ collection, id } = {}) {
    const documentRef = collection.doc(id);
    const doc = await documentRef.get();
    if (!doc.exists) {
      throw Error('Korisnik sa poslanom identifikacijskom oznakom ne postoji.');
    }
    return doc.data();
  }
  return Object.freeze({
    getDocumentFromCollectionById,
    insertIntoCollectionById,
    getAllFromCollection,
    insertIntoCollectionByAutoId,
  });
}
