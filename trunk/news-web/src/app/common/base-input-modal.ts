import {EventEmitter} from "@angular/core";

export interface BaseInputModal {

  value: any;
  valueChange: EventEmitter<any>;

  disabled: boolean;
  isRequired: boolean;
}
