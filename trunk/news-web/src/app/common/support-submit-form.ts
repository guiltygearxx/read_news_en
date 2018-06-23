import {Observable} from "rxjs/Observable";

export interface SupportSubmitForm<T> {

  errorMessages: string[];

  resultBean: T;

  validate(): boolean;

  submit(): Observable<T>;

  afterSubmit(resultBean: T): void;
}
