import { checkIfBase64 } from '../../utils/validationExpressions';

export default function buildMakeImage() {
  return function makeImage({ name, isMain, priority, base64 } = {}) {
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
      getPriority: () => Number(priority),
      getBase64: () => base64,
    });
  };
}
