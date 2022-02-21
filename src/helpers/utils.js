import moment from "moment";

export const HOUR_MINUTE_SECONDS_MASK = "HH:mm:ss";

export const isSameTime = (startTime, endTime) =>
  moment(startTime, HOUR_MINUTE_SECONDS_MASK).isSame(endTime);
export const isBeforeTime = (startTime, endTime) =>
  moment(startTime, HOUR_MINUTE_SECONDS_MASK).isBefore(endTime);
export const isAfterTime = (startTime, endTime) =>
  moment(startTime, HOUR_MINUTE_SECONDS_MASK).isAfter(endTime);
export const isSameOrBeforeTime = (startTime, endTime) =>
  moment(startTime, HOUR_MINUTE_SECONDS_MASK).isSameOrBefore(endTime);
export const isSameOrAfterTime = (startTime, endTime) =>
  moment(startTime, HOUR_MINUTE_SECONDS_MASK).isSameOrAfter(endTime);
