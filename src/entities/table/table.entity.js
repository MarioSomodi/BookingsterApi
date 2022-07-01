import { uid } from 'uid';

export default function buildMakeTable() {
  return function makeTable(
    action,
    nChairs = null,
    { capacity, description = null, id, reservedBy = null } = {}
  ) {
    if (action === 'post') {
      capacity = nChairs;
    }
    if (capacity <= 0) {
      throw Error('Stol mora imati mjesta za minimalno jednu osobu.');
    }
    return Object.freeze({
      getCapacity: () => capacity,
      getDescription: () => description,
      getReservedBy: () => reservedBy,
      getId: () => (action === 'post' ? uid(20) : id),
    });
  };
}
