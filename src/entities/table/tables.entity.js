export default function buildMakeTables({ makeTable }) {
  return function makeTables(action, tables = [], usersReservations = []) {
    if (!tables || tables.length < 1) {
      throw new Error('Objekt mora imati minimalno jedan stol.');
    }
    if (action === 'post') {
      const requestedTables = [];
      tables.forEach((tableRequest) => {
        for (let i = 0; i < tableRequest.nTables; i += 1) {
          requestedTables.push(
            makeTable(action, usersReservations, tableRequest.nChairs)
          );
        }
      });
      tables = requestedTables;
    } else {
      tables = tables.map((table) =>
        makeTable(action, usersReservations, null, table)
      );
    }
    return Object.freeze({
      getTables: () =>
        tables.map((table) => ({
          capacity: table.getCapacity(),
          description: table.getDescription(),
          reserved: table.getReserved(),
          id: table.getId(),
        })),
    });
  };
}
