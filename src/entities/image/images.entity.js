export default function buildMakeImages({ makeImage }) {
  return function makeImages(images = []) {
    if (!images || images.length < 1) {
      throw new Error('Objekt mora imati minimalno jednu sliku.');
    }
    images = images.map((image) => makeImage(image));
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
