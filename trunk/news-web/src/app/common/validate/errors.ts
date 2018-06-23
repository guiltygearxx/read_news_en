import {FieldError} from "./field-error";

export interface Errors {

  rejectValue(field: string, value: any, errorCode: string, args: any[]): void;

  getFieldErrors(field ?: string): FieldError[];

  resetFieldErrors(field ?: string): void;
}
