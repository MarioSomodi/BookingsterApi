export default function makeStorageActions({ bucket }) {
  function uploadBase64(path, base64) {
    const imageBuffer = Buffer.from(base64, 'base64');
    const imageByteArray = new Uint8Array(imageBuffer);
    const file = bucket.file(path);
    file.save(imageByteArray).catch((error) => {
      throw Error(`Došlo je do pogreške kod spremanja slike ${error}.`);
    });
  }
  return Object.freeze({ uploadBase64 });
}
