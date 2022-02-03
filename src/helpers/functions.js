export const ucfirst = (str) => {
  return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const checkobject = (objValue) => {
  return objValue && typeof objValue === "object" && objValue.constructor === Object;
};
