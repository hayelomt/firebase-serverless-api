import { APP_CONSTANTS } from './constants';
import { SupportedLocales } from '../types/enums';

export const parseLocale = (queryArg: any): SupportedLocales =>
  typeof queryArg === 'string' &&
  Object.values(SupportedLocales).includes(queryArg as SupportedLocales)
    ? (queryArg as unknown as SupportedLocales)
    : APP_CONSTANTS.defaultLocale;

export const removeUndefined = (
  data: Record<string, any>
): Record<string, any> => {
  const newData: Record<string, any> = {};
  Object.entries(data).forEach(([key, val]) => {
    if (val !== undefined) {
      newData[key] = val;
    }
  });

  return newData;
};
