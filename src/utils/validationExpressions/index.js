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

const checkIfDateStringIsValid = (dateString) => {
  // eslint-disable-next-line no-restricted-globals
  if (new Date(dateString) !== 'Invalid Date' && !isNaN(new Date(dateString))) {
    return true;
  }
  return false;
};

export { checkIfBase64, checkIfValidPhoneNumber, checkIfDateStringIsValid };
