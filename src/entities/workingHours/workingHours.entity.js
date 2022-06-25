import { checkIfDateStringIsValid } from '../../utils/validationExpressions';
import formatTime from '../../utils/formatTime';

export default function buildMakeWorkingHours() {
  return function makeWorkingHours(workingHours = []) {
    if (!workingHours || workingHours.length < 1) {
      throw new Error('Radno vrijeme objekta mora biti poslano.');
    }
    workingHours = workingHours.map(({ day, timeFrom, timeTo }) => {
      if (
        !checkIfDateStringIsValid(timeFrom) ||
        !checkIfDateStringIsValid(timeTo)
      ) {
        throw Error(
          'Jedno ili vise od poslanih radnih vremena objekta su nepravilni.'
        );
      }
      return Object.freeze({
        getDay: () => day,
        getTimeFrom: () => timeFrom,
        getTimeTo: () => timeTo,
      });
    });
    return Object.freeze({
      getWorkingHours: () =>
        workingHours.map((workHours) => {
          const timeFrom = new Date(workHours.getTimeFrom());
          const timeTo = new Date(workHours.getTimeTo());
          return {
            day: workHours.getDay(),
            timeFrom: formatTime(timeFrom),
            timeTo: formatTime(timeTo),
          };
        }),
    });
  };
}
