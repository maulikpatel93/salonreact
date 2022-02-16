export const ucfirst = (str) => {
  return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const checkobject = (objValue) => {
  return objValue && typeof objValue === "object" && objValue.constructor === Object;
};

export const ellipseText = function (text, limit) {
  if (text.length > limit) {
    let ext = text.split(".").pop();
    for (let i = limit; i > 0; i--) {
      if (text.charAt(i) === " " && (text.charAt(i - 1) != "," || text.charAt(i - 1) != "." || text.charAt(i - 1) != ";")) {
        return text.substring(0, i) + "..." + ext;
      }
    }
    return text.substring(0, limit) + "..." + ext;
  } else return text;
};
