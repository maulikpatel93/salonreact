const digitOnly = (value) => {
  if (value !== undefined) {
    return (/^\d+$/.test(value));
  }
  return true;
};
const decimalOnly = (value) => {
  if (value !== undefined) {
    return (/^\d{1,6}(\.\d{1,2})?$/.test(value));
  }
  return true;
};

export { digitOnly, decimalOnly };
