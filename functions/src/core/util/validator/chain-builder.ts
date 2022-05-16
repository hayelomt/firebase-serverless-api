import { ValidationChain } from 'express-validator';
export default class ChainBuilder {
  constructor(protected chain: ValidationChain, protected field: string) {}

  optional() {
    this.chain.optional().notEmpty().withMessage(`${this.field} is required`);
    return this;
  }

  required() {
    this.chain.notEmpty().withMessage(`${this.field} is required`);
    return this;
  }

  /** String validations */
  string() {
    this.chain
      .isString()
      .withMessage(`${this.field} must be a string(sentence)`);
    return this;
  }

  maxString(limit: number) {
    this.chain
      .isLength({ max: limit })
      .withMessage(`${this.field} must be under ${limit} characters long`);
    return this;
  }

  email() {
    this.chain.isEmail().withMessage(`${this.field} must be a valid email`);
    return this;
  }

  /** Number validations */
  integer() {
    this.chain.isInt().withMessage(`${this.field} must be a number(integer)`);
    return this;
  }

  intGt(val: number) {
    this.chain
      .isInt({ gt: val })
      .withMessage(`${this.field} must be greater than ${val}`);
    return this;
  }

  intGte(val: number) {
    this.chain
      .isInt({ min: val })
      .withMessage(`${this.field} must be greater than or equal to ${val}`);
    return this;
  }

  number() {
    this.chain.isFloat().withMessage(`${this.field} must be number`);
    return this;
  }

  numberGte(val: number) {
    this.chain
      .isFloat({ min: val })
      .withMessage(`${this.field} must be greater than or equal to ${val}`);
    return this;
  }

  date() {
    this.chain.isDate().withMessage(`${this.field} must be a date`);
    return this;
  }

  dateAfter(date?: string) {
    // this.chain.isAfter(date).withMessage(`${this.field} must be after ${date}`);
    return this;
  }

  array() {
    this.chain.isArray().withMessage(`${this.field} must be a list`);
    return this;
  }

  bool() {
    this.chain
      .isBoolean()
      .withMessage(`${this.field} must be either true or false`);
    return this;
  }

  location() {
    this.chain
      .isLatLong()
      .withMessage(`${this.field} must be a valid location (lat,long)`);
    return this;
  }

  build() {
    return this.chain;
  }
}
