import { uid } from 'uid';

export default function buildMakeTable() {
  return function makeTable(
    action,
    userReservations,
    nChairs = null,
    { capacity, description = null, id } = {}
  ) {
    if (action === 'post') {
      capacity = Number(nChairs);
    }
    if (capacity <= 0) {
      throw Error('Stol mora imati mjesta za minimalno jednu osobu.');
    }
    return Object.freeze({
      getCapacity: () => Number(capacity),
      getDescription: () => description,
      getReserved: () =>
        userReservations.some(
          (uR) => uR.tablesReserved.includes(id) && uR.status === 1
        ),
      getId: () => (action === 'post' ? uid(20) : id),
    });
  };
}
