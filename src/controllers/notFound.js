export default async function notFound() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: { error: 'Endpoint not found' },
    statusCode: 404,
  };
}
