
/**
 *
 * @param res
 */
export const httpSuccess = (res) => res.status === 200;

/**
 *
 * @param time
 * @param format
 */
export const timeStampFormat = (time, format) => {
  if (!time) {
    return '';
  }
  const t = new Date(+time);
  const tf = (i) => (i < 10 ? '0' : '') + i;
  return format.replace(
    /yyyy|MM|dd|HH|mm|ss/g,
    (a) => {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
        case 'MM':
          return tf(t.getMonth() + 1);
        case 'mm':
          return tf(t.getMinutes());
        case 'dd':
          return tf(t.getDate());
        case 'HH':
          return tf(t.getHours());
        case 'ss':
          return tf(t.getSeconds());
        default:
          return time + '';
      }
    },
  );
};

export default {
  httpSuccess,
  timeStampFormat,
};
