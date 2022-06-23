import { makeEstablishment } from '../../entities';

export default function makeCreateEstablishment({
  establishmentsCollection,
  CRUDDb,
  storageActions,
}) {
  return async function createEstablishment({ establishmentInfo }) {
    const establishment = makeEstablishment(establishmentInfo, 'post');
    establishment.getImagesToUpload().forEach((image) => {
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
