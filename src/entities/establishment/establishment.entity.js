import isOibValid from '../../adapters/oibValidator';
import formatTime from '../../adapters/formatTime';

export default function buildMakeEstablishment() {
  function validateWorkingHours(workingHours) {
    workingHours.forEach((workHours) => {
      if (
        (new Date(workHours.timeFrom) !== 'Invalid Date' &&
          !Number.isNaN(new Date(workHours.timeFrom))) ||
        (new Date(workHours.timeTo) !== 'Invalid Date' &&
          !Number.isNaN(new Date(workHours.timeTo)))
      ) {
        throw Error(
          'Jedno ili vise od poslanih radnih vremena objekta su nepravilni'
        );
      }
    });
  }

  function makeWorkingHoursUserFriendly(workingHours) {
    const userFriendlyWorkHours = [];
    workingHours.forEach((workHours) => {
      const timeFrom = new Date(workHours.timeFrom);
      const timeTo = new Date(workHours.timeTo);
      userFriendlyWorkHours.push({
        day: workHours.day,
        timeFrom: formatTime(timeFrom),
        timeTo: formatTime(timeTo),
      });
    });
    return userFriendlyWorkHours;
  }

  function validateImages(images) {
    const base64RegEx =
      '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$';
    images.forEach((image) => {
      if (!image.base64.match(base64RegEx)) {
        throw Error(
          'Jedna ili vise od poslanih slika nisu dobro kodirane u base64'
        );
      }
    });
  }

  function makeImagesUserFriendly(images) {
    const userFriendlyImages = [];
    const imagesBase64 = [];
    images.forEach((image) => {
      userFriendlyImages.push({
        name: image.name,
        isMain: image.isMain,
        priority: image.priority,
      });
      imagesBase64.push({
        base64: image.base64,
        name: image.name,
      });
    });
    return { images: userFriendlyImages, imagesToUpload: imagesBase64 };
  }

  return function makeEstablishment(
    {
      location,
      name,
      numberOfReservations,
      oib,
      images,
      phoneNumber,
      workingHours,
    },
    action
  ) {
    const { address, city, country } = location;
    let imagesToUpload = [];
    if (!address || address.trim().length < 1) {
      throw new Error('Adresa objekta mora biti poslana.');
    }
    if (!city || city.trim().length < 1) {
      throw new Error('Grad u kojem se objekt nalazi mora biti poslan.');
    }
    if (!country || country.trim().length < 1) {
      throw new Error('Država u kojoj se objekt nalazi mora biti poslana.');
    }
    if (!name || name.trim().length < 1) {
      throw new Error('Ime objekta mora biti poslano.');
    }
    if (!oib || !isOibValid(oib)) {
      throw new Error('OIB objekta mora biti pravilan.');
    }
    if (!workingHours || workingHours.length < 1) {
      throw new Error('Radno vrijeme objekta mora biti poslano.');
    } else if (action === 'post') {
      validateWorkingHours(workingHours);
      workingHours = makeWorkingHoursUserFriendly(workingHours);
    }
    if (!images || images.length < 1) {
      throw new Error('Objekt mora imati minimalno jednu sliku.');
    } else if (action === 'post') {
      validateImages(images);
      const userFriendlyImages = makeImagesUserFriendly(images);
      images = userFriendlyImages.images;
      imagesToUpload = userFriendlyImages.imagesToUpload;
    }
    return Object.freeze({
      getName: () => name,
      getImages: () => images,
      getOIB: () => oib,
      getPhoneNumber: () => phoneNumber,
      getLocation: () => location,
      getWorkingHours: () => workingHours,
      getNumberOfReservations: () => numberOfReservations,
      getImagesToUpload: () => imagesToUpload,
    });
  };
}
