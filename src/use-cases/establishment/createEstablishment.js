import { makeEstablishment } from '../../entities';

export default function makeCreateEstablishment({
  establishmentsCollection,
  CRUDDb,
  storageActions,
}) {
  return async function createEstablishment({ establishmentInfo }) {
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
    const establishment = makeEstablishment(establishmentInfo, 'post');
    establishment.getImagesForUpload().forEach((image) => {
      storageActions.uploadBase64(
        `${establishment.getOIB()}/${image.name}`,
        image.base64
      );
    });
    const insertedEstablishment = await CRUDDb.insertIntoCollectionById({
      collection: establishmentsCollection,
      data: {
        phoneNumber: establishment.getPhoneNumber(),
        images: establishment.getImages(),
        location: establishment.getLocation(),
        name: establishment.getName(),
        numberOfReservations: establishment.getNumberOfReservations(),
        oib: establishment.getOIB(),
        workingHours: establishment.getWorkingHours(),
      },
      id: establishment.getOIB(),
    });
    return insertedEstablishment;
  };
}
