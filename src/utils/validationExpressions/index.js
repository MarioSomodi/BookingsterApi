/* eslint-disable radix */
const checkIfBase64 = (input) => {
  const base64RegEx =
    '^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$';
  if (input.match(base64RegEx)) {
    return true;
  }
  return false;
};

const checkIfValidPhoneNumber = (phoneNumber) => {
  const phoneNumberRegEx = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$';
  if (phoneNumber.match(phoneNumberRegEx)) {
    return true;
  }
  return false;
};

const checkIfValidDateSent = (date, onlyHourAndMinutes) => {
  if (onlyHourAndMinutes) {
    if (
      !date ||
      typeof date.hours !== 'number' ||
      typeof date.minutes !== 'number' ||
      date.hours < 0 ||
      date.minutes < 0
    ) {
      return false;
    }
    return true;
  }
  if (
    !date ||
    typeof date.year !== 'number' ||
    typeof date.month !== 'number' ||
    typeof date.day !== 'number' ||
    typeof date.hours !== 'number' ||
    typeof date.minutes !== 'number' ||
    date.year < 0 ||
    date.month < 0 ||
    date.day < 0 ||
    date.hours < 0 ||
    date.minutes < 0
  ) {
    return false;
  }
  return true;
};

export { checkIfBase64, checkIfValidPhoneNumber, checkIfValidDateSent };
