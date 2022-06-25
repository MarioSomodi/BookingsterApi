export default function buildMakeTables({ makeTable }) {
  return function makeTables(action, tables = []) {
    if (!tables || tables.length < 1) {
      throw new Error('Objekt mora imati minimalno jedan stol.');
    }
    tables = tables.map((table) => makeTable(table, action));
    return Object.freeze({
      getTables: () =>
        tables.map((table) => ({
          capacity: table.getCapacity(),
          description: table.getDescription(),
          reservedBy: table.getReservedBy(),
          id: table.getId(),
        })),
    });
  };
}
