import formatTime from '../../utils/formatTime';
import { checkIfValidDateSent } from '../../utils/validationExpressions';

export default function buildMakeWorkingHours() {
  return function makeWorkingHours(workingHours = []) {
    if (!workingHours || workingHours.length < 1) {
      throw new Error('Radno vrijeme objekta mora biti poslano.');
    }
    workingHours = workingHours.map(({ day, timeFrom, timeTo, index }) => {
      if (
        !checkIfValidDateSent(timeFrom, true) &&
        !checkIfValidDateSent(timeTo, true)
      ) {
        throw Error('Jedno ili vise od poslanih radnih vremena su nepravilna.');
      }
      timeFrom = new Date(
        Date.UTC(0, 0, 0, timeFrom.hours, timeFrom.minutes, 0)
      );
      if (timeTo.hours === 0) {
        timeTo.hours = 24;
      }
      timeTo = new Date(Date.UTC(0, 0, 0, timeTo.hours, timeTo.minutes, 0));
      return Object.freeze({
        getDay: () => day,
        getIndex: () => index,
        getTimeFrom: () => timeFrom,
        getTimeTo: () => timeTo,
      });
    });
    return Object.freeze({
      getWorkingHours: () =>
        workingHours
          .map((workHours) => ({
            index: workHours.getIndex(),
            day: workHours.getDay(),
            timeFrom: formatTime(workHours.getTimeFrom()),
            timeTo: formatTime(workHours.getTimeTo()),
          }))
          .sort((a, b) => (a.index > b.index ? 1 : -1)),
    });
  };
}
