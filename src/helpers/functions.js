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

export const checkaccess = (obj) => {
  let isaccess = false;
  if (obj.role_id === 5) {
    let salonaccess = obj.access
      .filter((list) => list.module_id === obj.module_id || list.controller === obj.controller)
      .map((list) => {
        if (list.permission && list.permission.includes(obj.name)) {
          return true;
        }
      });
    var filtered = salonaccess.filter(function (x) {
      return x !== undefined;
    });
    if (filtered.length > 0) {
      isaccess = true;
    }
  }
  if (obj.role_id === 4) {
    isaccess = true;
  }
  if (obj.module_id === 1) {
    isaccess = true;
  }
  return isaccess;
};
