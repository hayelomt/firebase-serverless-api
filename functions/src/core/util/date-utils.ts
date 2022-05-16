import * as moment from 'moment';

enum DateDiffAs {
  Days = 'Days',
  Months = 'Months',
  Minutes = 'Minutes',
}

const getTimeDifference = (
  start: string,
  end: string,
  dateDiffAs: DateDiffAs
) => {
  const endDate = end === 'now' ? moment() : moment(end);
  if (dateDiffAs === DateDiffAs.Minutes) {
    return moment.duration(endDate.diff(start)).asMinutes();
  } else if (dateDiffAs === DateDiffAs.Days) {
    return moment.duration(endDate.diff(start)).asDays();
  } else {
    return null;
  }
};

const getDateTimeNow = (): string => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};

const getDateNow = () => {
  return moment().format('YYYY-MM-DD');
};

const getDateTimeNowShort = () => {
  return moment().format('YYYYMMDDHHMMSS');
};

export {
  DateDiffAs,
  getTimeDifference,
  getDateTimeNow,
  getDateNow,
  getDateTimeNowShort,
};
