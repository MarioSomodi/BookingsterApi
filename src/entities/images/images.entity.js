import { checkIfBase64 } from '../../utils/validationExpressions';

export default function buildMakeImages() {
  return function makeImages(images = []) {
    if (!images || images.length < 1) {
      throw new Error('Objekt mora imati minimalno jednu sliku.');
    }
    images = images.map(({ name, isMain, priority, base64 }) => {
      if (!name || name.trim().length < 1) {
        throw Error('Jedna ili vise od slika nema ime, a ime je obavezno.');
      }
      if (!isMain || typeof isMain !== 'boolean') {
        throw Error(
          'Argument koji govori je li slika naslovna ili ne, mora biti poslan te također mora biti u dobrom formatu.'
        );
      }
      if (priority < 0) {
        throw Error(
          'Pozicija slika moraju biti poslane, i ne smiju biti negativne.'
        );
      }
      if (!base64 || !checkIfBase64(base64)) {
        throw Error('Jedna ili vise od slika nisu dobro kodirane u base64');
      }
      return Object.freeze({
        getName: () => name,
        getIsMain: () => isMain,
        getPriority: () => priority,
        getBase64: () => base64,
      });
    });
    return Object.freeze({
      getImagesForUpload: () =>
        images.map((image) => ({
          base64: image.getBase64(),
          name: image.getName(),
        })),
      getImages: () =>
        images.map((image) => ({
          name: image.getName(),
          isMain: image.getIsMain(),
          priority: image.getPriority(),
        })),
    });
  };
}
