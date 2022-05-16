import { UserType } from './enums';

export type DtoFactory<T> = (data: any) => T;

export type TransactionUpdate = Record<string, any>;

export type AuthUser = {
  userType?: UserType;
  uid: string;
};

export type ValidationErrorType = Record<string, string>;

export type ErrorType = ValidationErrorType | Record<string, any>;

export type ApiMethod = 'get' | 'post' | 'patch' | 'delete';

export type FireFile = {
  url: string;
  refPath: string;
};
