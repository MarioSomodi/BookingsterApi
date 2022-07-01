import formatTime from '../../utils/formatTime';

export default function buildMakeWorkingHours() {
  return function makeWorkingHours(workingHours = []) {
    if (!workingHours || workingHours.length < 1) {
      throw new Error('Radno vrijeme objekta mora biti poslano.');
    }
    workingHours = workingHours.map(({ day, timeFrom, timeTo }) => {
      if (
        !timeFrom ||
        !timeTo ||
        typeof timeFrom.hours !== 'number' ||
        typeof timeTo.hours !== 'number' ||
        typeof timeFrom.minutes !== 'number' ||
        typeof timeTo.minutes !== 'number' ||
        timeFrom.hours < 0 ||
        timeTo.hours < 0 ||
        timeFrom.minutes < 0 ||
        timeTo.minutes < 0
      ) {
        throw Error('Jedno ili vise od poslanih radnih vremena su nepravilna.');
      }
      timeFrom = new Date(
        Date.UTC(0, 0, 0, timeFrom.hours, timeFrom.minutes, 0)
      );
      timeTo = new Date(Date.UTC(0, 0, 0, timeTo.hours, timeTo.minutes, 0));
      return Object.freeze({
        getDay: () => day,
        getTimeFrom: () => timeFrom,
        getTimeTo: () => timeTo,
      });
    });
    return Object.freeze({
      getWorkingHours: () =>
        workingHours.map((workHours) => ({
          day: workHours.getDay(),
          timeFrom: formatTime(workHours.getTimeFrom()),
          timeTo: formatTime(workHours.getTimeTo()),
        })),
    });
  };
}
