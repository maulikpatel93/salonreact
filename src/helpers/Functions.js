import moment, { tz } from "moment";
import { useSelector } from "react-redux";

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
  if (obj.role_id === 5 && (obj.module_id || obj.controller)) {
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

export const MinutesToHours = (minutes) => {
  var Hours = Math.floor(minutes / 60);
  var minutes = minutes % 60;
  if (Hours < 10) {
    Hours = "0" + Hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return Hours + ":" + minutes;
};

export const HoursToMinutes = (timeInHour) => {
  var timeParts = timeInHour.split(":");
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
};

export const getHours = (time, format) => {
  if (format === "H:m") {
    time = HoursToMinutes(time);
  }
  var Hours = Math.floor(time / 60);
  var minutes = time % 60;
  if (Hours < 10) {
    Hours = "0" + Hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return Hours ? Hours : "";
};

export const getMinutes = (time, format) => {
  if (format === "H:m") {
    time = HoursToMinutes(time);
  }
  var Hours = Math.floor(time / 60);
  var minutes = time % 60;
  if (Hours < 10) {
    Hours = "0" + Hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes ? minutes : "";
};

export const uniqueArrayofObject = (arr, keyProps) => {
  const kvArray = arr.map((entry) => {
    const key = keyProps.map((k) => entry[k]).join("|");
    return [key, entry];
  });
  const map = new Map(kvArray);
  return Array.from(map.values());
};

export const authuser = () => {
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  return currentUser;
};
export const localtimezone = () => {
  return authuser() ? authuser().salon.timezone : "";
};

export const MomentFormat = (date = "", format = "YYYY-MMMM-DD") => {
  return moment(date).format(format);
};

export const MomentFormatWithLocalTimezone = (date = "", format = "YYYY-MMMM-DD") => {
  return moment(date).format(format).tz(localtimezone());
};

const Functions = {};

export default Functions;
