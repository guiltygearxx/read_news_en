import {Errors} from "./errors";
import {FieldError} from "./field-error";
import {isNullOrUndefined} from "util";
import {ApplicationUtils} from "../application-utils";

type FieldErrorMappingType = { [field: string]: { [errorCode: string]: FieldError } };

export class DefaultErrors implements Errors {

  private fieldErrors: FieldError[] = [];

  private fieldErrorMapping: FieldErrorMappingType;

  constructor(protected applicationUtils: ApplicationUtils) {

    this.fieldErrorMapping = {};
  }

  getFieldErrors(field ?: string): FieldError[] {

    if (this.applicationUtils.isStringEmpty(field)) {

      return this.fieldErrors;

    } else {

      if (isNullOrUndefined(this.fieldErrorMapping[field])) return null;

      return Object.keys(this.fieldErrorMapping[field]).map((errorCode: string) =>

        this.fieldErrorMapping[field][errorCode]
      );
    }
  }

  rejectValue(field: string, value: any, errorCode: string, args: any[]): void {

    let error = new FieldError();

    error.field = field;
    error.errorCode = errorCode;
    error.params = [value];

    if (!isNullOrUndefined(args) && args.length) error.params = error.params.concat(args);

    this.addError(error);

    this.addFieldErrorToMapping(error);
  }

  resetFieldErrors(field ?: string): void {

    if (this.applicationUtils.isStringEmpty(field)) {

      this.fieldErrors = [];

      this.fieldErrorMapping = {};
    } else {

      this.fieldErrors = this.fieldErrors.filter((error) => error.field != field);

      this.fieldErrorMapping[field] = null;
    }
  }

  private addError(error: FieldError): void {

    this.fieldErrors.push(error);
  }

  private addFieldErrorToMapping(error: FieldError): void {

    let mapping_ = this.fieldErrorMapping[error.field];

    if (isNullOrUndefined(mapping_)) {

      mapping_ = this.fieldErrorMapping[error.field] = {};
    }

    mapping_[error.errorCode] = error;
  }
}
