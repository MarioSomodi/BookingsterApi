export default async function notFound() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: 'Erorr 404 : Endpoint not found.',
    statusCode: 404,
  };
}
