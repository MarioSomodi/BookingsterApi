export default function makeStorageActions({ bucket }) {
  async function uploadBase64(path, base64) {
    const imageBuffer = Buffer.from(base64, 'base64');
    const imageByteArray = new Uint8Array(imageBuffer);
    const file = bucket.file(path);
    const imageUrl = await file
      .save(imageByteArray)
      .then(() =>
        file.getSignedUrl({
          action: 'read',
          expires: '03-09-2500',
        })
      )
      .then((urls) => {
        const url = urls[0];
        return url;
      })
      .catch((err) => {
        throw Error(`Doslo je do greske prilikom spremanje slika.${err}`);
      });
    return imageUrl;
  }
  return Object.freeze({ uploadBase64 });
}
