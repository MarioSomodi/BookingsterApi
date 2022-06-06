export default async function notFound() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: { errorMessage: 'Endpoint not found' },
    statusCode: 404,
  };
}
