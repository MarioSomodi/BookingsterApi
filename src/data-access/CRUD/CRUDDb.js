export default function makeCRUDDb() {
  async function insertIntoCollectionById({ collection, data, id } = {}) {
    if (typeof id !== 'string') id = String(id);
    const dataRef = collection.doc(id);
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
    if (typeof id !== 'string') id = String(id);
    const documentRef = collection.doc(id);
    const doc = await documentRef.get();
    if (!doc.exists) {
      throw Error('Dokument sa poslanim identifikatorom ne postoji.');
    }
    return doc.data();
  }

  async function getDocumentsFromCollectionByPropertyValue({
    collection,
    propertyName,
    propertyValue,
  } = {}) {
    const results = [];
    const queryResult = await collection
      .where(propertyName, '==', propertyValue)
      .get();
    queryResult.forEach((doc) => {
      results.push(doc.data());
    });
    return results;
  }

  async function checkIfDocWithIdExistsInCollection({ collection, id } = {}) {
    if (typeof id !== 'string') id = String(id);
    const documentRef = collection.doc(id);
    const doc = await documentRef.get();
    if (doc.exists) {
      return true;
    }
    return false;
  }

  async function checkIfDocumentWithPropertyValueExistsInCollection({
    collection,
    propertyName,
    propertyValue,
  } = {}) {
    const queryResult = await collection
      .where(propertyName, '==', propertyValue)
      .limit(1)
      .get();
    if (queryResult.empty) {
      return false;
    }
    return true;
  }

  async function updateDocumentFromCollectionById({
    collection,
    updatedData,
    id,
  }) {
    const documentRef = collection.doc(id);
    await documentRef.update(updatedData);
    const doc = await documentRef.get();
    if (doc.exists) {
      return true;
    }
    return false;
  }

  return Object.freeze({
    checkIfDocumentWithPropertyValueExistsInCollection,
    checkIfDocWithIdExistsInCollection,
    getDocumentFromCollectionById,
    insertIntoCollectionById,
    getAllFromCollection,
    getDocumentsFromCollectionByPropertyValue,
    insertIntoCollectionByAutoId,
    updateDocumentFromCollectionById,
  });
}
