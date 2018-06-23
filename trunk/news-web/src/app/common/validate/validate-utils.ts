import {Injectable} from '@angular/core';
import {Validateable} from './validateable';
import {isNullOrUndefined, isString} from 'util';
import {DefaultErrors} from './default-errors';
import {
  CONSTRAIN_BLANK,
  CONSTRAIN_EMAIL,
  CONSTRAIN_INLIST,
  CONSTRAIN_MATCHES,
  CONSTRAIN_MAX,
  CONSTRAIN_MAXSIZE,
  CONSTRAIN_MIN,
  CONSTRAIN_MINSIZE,
  CONSTRAIN_NOTEQUAL,
  CONSTRAIN_NULLABLE,
  CONSTRAIN_SIZE,
  EMAIL_REGEX,
  ERROR_EMAIL,
  ERROR_INLIST,
  ERROR_MATCHES,
  ERROR_MAX,
  ERROR_MAXSIZE,
  ERROR_MIN,
  ERROR_MINSIZE,
  ERROR_NOTEQUAL,
  ERROR_NULLABLE,
  ERROR_SIZE_TOOBIG,
  ERROR_SIZE_TOOSMALL
} from '../application-constants';
import {ApplicationUtils} from '../application-utils';
import {Errors} from './errors';
import {FieldError} from './field-error';
import BigNumber from 'bignumber.js';

type ErrorHandleFnType = ((value: any, errorCode: string, args: any[]) => void);

@Injectable()
export class ValidateUtils {

  constructor(private applicationUtils: ApplicationUtils) {
  }

  buildFieldErrorMessage(error: FieldError, prefix ?: string): string {

    let code = (this.applicationUtils.isStringEmpty(prefix) ? '' : (prefix + '.' + error.field + '.')) + error.errorCode;

    return this.applicationUtils.message(code, error.params);
  }

  getFieldErrorMessage(field: string, obj: Validateable, prefix ?: string): string {

    if (isNullOrUndefined(obj) || isNullOrUndefined(obj.errors)) return null;

    let fieldErrors = obj.errors.getFieldErrors(field);

    if (isNullOrUndefined(fieldErrors) || !fieldErrors.length) return null;

    return this.buildFieldErrorMessage(fieldErrors[0], prefix);
  }

  validate(obj: Validateable, constrains: any): boolean {

    if (isNullOrUndefined(obj) || isNullOrUndefined(constrains)) return true;

    let errors = obj.errors;

    if (isNullOrUndefined(errors))
      errors = (obj.errors = new DefaultErrors(this.applicationUtils));

    errors.resetFieldErrors();

    let isOK: boolean = true;

    Object.keys(constrains).forEach((field) => {

      if (!this.validateField_(obj, constrains, field, errors)) isOK = false;
    });

    return isOK;
  }

  validateField(obj: Validateable, constrains: any, field: string): boolean {

    if (isNullOrUndefined(obj) || isNullOrUndefined(constrains)) return true;

    let errors = obj.errors;

    if (isNullOrUndefined(errors))
      errors = (obj.errors = new DefaultErrors(this.applicationUtils));

    errors.resetFieldErrors(field);

    return this.validateField_(obj, constrains, field, errors);
  }

  nullable(value: any, nullable: boolean, errorHandleFn: ErrorHandleFnType): boolean {

    if ((isNullOrUndefined(value) || ((isString(value) && this.applicationUtils.isStringEmpty(value)))) && !nullable) {

      errorHandleFn(value, ERROR_NULLABLE, null);

      return false;
    }

    return true;
  }

  blank(value: any, blank: boolean, errorHandleFn: ErrorHandleFnType): boolean {

    if (!blank && (isNullOrUndefined(value) || this.applicationUtils.isStringEmpty(value))) {

      errorHandleFn(value, ERROR_NULLABLE, null);

      return false;
    }

    return true;
  }

  email(value: string, email: boolean, errorHandleFn: ErrorHandleFnType): boolean {

    if (email && !isNullOrUndefined(value) && !EMAIL_REGEX.test(value.toLowerCase())) {

      errorHandleFn(value, ERROR_EMAIL, null);

      return false;
    }

    return true;
  }

  inList(value: string, list: any[], errorHandleFn: ErrorHandleFnType): boolean {

    if (list.indexOf(value) == -1) {

      errorHandleFn(value, ERROR_INLIST, [list]);

      return false;
    }

    return true;
  }

  matches(value: string, regexStr: string, errorHandleFn: ErrorHandleFnType): boolean {

    let regex = new RegExp(regexStr);

    if (!isNullOrUndefined(value) && !regex.test(value)) {

      errorHandleFn(value, ERROR_MATCHES, null);

      return false;
    }

    return true;
  }

  maxSize(value: (string | any[]), maxSize: number, errorHandleFn: ErrorHandleFnType): boolean {

    let size = isNullOrUndefined(value) ? 0 : value.length;

    if (size > maxSize) {

      errorHandleFn(value, ERROR_MAXSIZE, [size, maxSize]);

      return false;
    }

    return true;
  }

  minSize(value: (string | any[]), minSize: number, errorHandleFn: ErrorHandleFnType): boolean {

    let size = isNullOrUndefined(value) ? 0 : value.length;

    if (size < minSize) {

      errorHandleFn(value, ERROR_MINSIZE, [size, minSize]);

      return false;
    }

    return true;
  }

  notEqual(value: any, otherValue: any, errorHandleFn: ErrorHandleFnType): boolean {

    if (value == otherValue) {

      errorHandleFn(value, ERROR_NOTEQUAL, [otherValue]);

      return false;
    }

    return true;
  }

  max(value: any, max: number, errorHandleFn: ErrorHandleFnType): boolean {

    if (!isNullOrUndefined(value)) {

      let value_ = this.applicationUtils.convertStringToBigNumber(value.toString());

      if (value_.gt(max)) {

        errorHandleFn(value, ERROR_MAX, [value, max]);

        return false;
      }
    }

    return true;
  }

  min(value: number, min: number, errorHandleFn: ErrorHandleFnType): boolean {

    if (!isNullOrUndefined(value)) {

      let value_ = this.applicationUtils.convertStringToBigNumber(value.toString());

      if (value_.lt(min)) {

        errorHandleFn(value, ERROR_MIN, [value, min]);

        return false;
      }
    }

    return true;
  }

  size(value: (string | any[]), range: number[], errorHandleFn: ErrorHandleFnType): boolean {

    let minSize = range[0];
    let maxSize = range[1];
    let size = isNullOrUndefined(value) ? 0 : value.length;

    if (size < minSize) {

      errorHandleFn(value, ERROR_SIZE_TOOSMALL, [value, minSize]);

      return false;

    } else if (size > maxSize) {

      errorHandleFn(value, ERROR_SIZE_TOOBIG, [value, maxSize]);

      return false;
    }

    return true;
  }

  private validateField_(obj: Validateable, constrains: any, field: string, errors: Errors): boolean {

    let isOK: boolean = true;

    let fieldValue = obj[field];

    let fieldConstrains = constrains[field];

    Object.keys(fieldConstrains).forEach((constrainName) => {

      let constrainConfig: any = fieldConstrains[constrainName];

      let errorHandleFn: ErrorHandleFnType =
        ((value: any, errorCode: string, args: any[]) => errors.rejectValue(field, fieldValue, errorCode, args));

      switch (constrainName) {

        case CONSTRAIN_NULLABLE:
          return (isOK = isOK && this.nullable(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_BLANK:
          return (isOK = isOK && this.blank(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_EMAIL:
          return (isOK = isOK && this.email(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_INLIST:
          return (isOK = isOK && this.inList(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_MATCHES:
          return (isOK = isOK && this.matches(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_MAXSIZE:
          return (isOK = isOK && this.maxSize(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_MINSIZE:
          return (isOK = isOK && this.minSize(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_NOTEQUAL:
          return (isOK = isOK && this.notEqual(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_MAX:
          return (isOK = isOK && this.max(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_MIN:
          return (isOK = isOK && this.min(fieldValue, constrainConfig, errorHandleFn));

        case CONSTRAIN_SIZE:
          return (isOK = isOK && this.size(fieldValue, constrainConfig, errorHandleFn));

        default:
          return;
      }
    });

    return isOK;
  }
}
