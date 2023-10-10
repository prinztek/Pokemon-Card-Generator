const toUpperCase = (string) => {
  let upperCasedString = "";
  for (let i = 0; i < string.length; i++) {
    if (i === 0) {
      upperCasedString += string[i].toUpperCase();
    } else {
      upperCasedString += string[i];
    }
  }
  return upperCasedString;
};

export default toUpperCase;
