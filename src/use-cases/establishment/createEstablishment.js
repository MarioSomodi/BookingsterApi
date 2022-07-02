import { makeEstablishment } from '../../entities';

export default function makeCreateEstablishment({
  establishmentsCollection,
  establishmentsTablesCollection,
  CRUDDb,
  storageActions,
  usersCollection,
}) {
  return async function createEstablishment({ establishmentInfo }) {
    if (
      !(await CRUDDb.checkIfDocWithIdExistsInCollection({
        collection: usersCollection,
        id: establishmentInfo.owner,
      }))
    ) {
      throw Error(
        'Osoba koju ste specificirali kao vlasnik objekta ne postoji.'
      );
    }
    if (
      await CRUDDb.checkIfDocWithIdExistsInCollection({
        collection: establishmentsCollection,
        id: establishmentInfo.oib,
      })
    ) {
      throw Error('Objekt sa tim OIB-om vec postoji.');
    }
    if (
      await CRUDDb.checkIfDocumentWithPropertyValueExistsInCollection({
        collection: establishmentsCollection,
        propertyName: 'name',
        propertyValue: establishmentInfo.name,
      })
    ) {
      throw Error('Objekt sa tim imenom vec postoji.');
    }
    const establishment = makeEstablishment(establishmentInfo, [], 'post');
    const insertedTables = await CRUDDb.insertIntoCollectionById({
      collection: establishmentsTablesCollection,
      data: {
        tables: establishment.getTables(),
      },
      id: establishment.getOIB(),
    });
    const imageUrls = await Promise.all(
      establishment.getImagesForUpload().map(async (image) => {
        const uploadedImageUrl = await storageActions.uploadBase64(
          `${establishment.getOIB()}/${image.name}`,
          image.base64
        );
        return { imageUrl: uploadedImageUrl, name: image.name };
      })
    );
    const insertedEstablishment = await CRUDDb.insertIntoCollectionById({
      collection: establishmentsCollection,
      data: {
        owner: establishment.getOwner(),
        phoneNumber: establishment.getPhoneNumber(),
        images: establishment.getImages().map((image) => ({
          ...image,
          imageUrl: imageUrls.filter(
            (imageUrl) => image.name === imageUrl.name
          )[0].imageUrl,
        })),
        location: establishment.getLocation(),
        name: establishment.getName(),
        numberOfReservations: establishment.getNumberOfReservations(),
        oib: establishment.getOIB(),
        workingHours: establishment.getWorkingHours(),
      },
      id: establishment.getOIB(),
    });

    insertedEstablishment.tables = insertedTables.tables;
    return insertedEstablishment;
  };
}
