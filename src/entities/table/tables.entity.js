export default function buildMakeTables({ makeTable }) {
  return function makeTables(action, tables = []) {
    if (!tables || tables.length < 1) {
      throw new Error('Objekt mora imati minimalno jedan stol.');
    }
    if (action === 'post') {
      const requestedTables = [];
      tables.forEach((tableRequest) => {
        for (let i = 0; i < tableRequest.nTables; i += 1) {
          requestedTables.push(makeTable(action, tableRequest.nChairs));
        }
      });
      tables = requestedTables;
    } else {
      tables = tables.map((table) => makeTable(table, action));
    }
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
