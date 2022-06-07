import { CRUDDb, logsCollection } from './data-access';

const logger = async (error) => {
  await CRUDDb.insertIntoCollectionByAutoId({
    collection: logsCollection,
    data: { ...error, timestamp: new Date() },
  });
};

export default logger;
