import {ApplicationUtils} from './application-utils';
import {Injectable, SimpleChanges} from '@angular/core';
import {AdminLteInputModal} from './admin-lte-input-modal';
import {SupportOnChangesComponentModal} from './support-on-changes-component-modal';
import {isNullOrUndefined} from 'util';
import {OnChangeCallBack} from './on-change-call-back';
import {INPUT_FORMAT_DATE, INPUT_FORMAT_NUMBER} from './application-constants';
import {DateFormatter} from './formater/date-formatter';
import {NumberFormatter} from './formater/number-formatter';

@Injectable()
export class ComponentUtils {

  constructor(protected applicationUtils: ApplicationUtils,
              protected dateFormatter: DateFormatter,
              protected numberFormatter: NumberFormatter) {
  }

  generateInputId(input: AdminLteInputModal): void {

    input.inputId = this.applicationUtils.randomNumber().toString();
  }

  storedChangedAttrs(changes: SimpleChanges, component: SupportOnChangesComponentModal): void {

    component.contentChangedAttrs = Object.keys(changes);

    component.viewChangedAttrs = Object.keys(changes);
  }

  runAfterContentCheckedCallback(component: SupportOnChangesComponentModal): void {

    this.runCallbacks(component.afterContentCheckCallbacks, component.contentChangedAttrs);

    component.contentChangedAttrs = null;
  }

  runAfterViewCheckedCallback(component: SupportOnChangesComponentModal): void {

    this.runCallbacks(component.afterViewCheckCallbacks, component.viewChangedAttrs);

    component.viewChangedAttrs = null;
  }

  trim(str: string): string {

    if (isNullOrUndefined(str)) return str;

    return str.trim();
  }

  formatValue(val: any, formatType: string): string {

    if (isNullOrUndefined(val)) return val;

    switch (formatType) {

      case INPUT_FORMAT_DATE:
        return this.dateFormatter.format(val);

      case INPUT_FORMAT_NUMBER:
        return this.numberFormatter.format(val);

      default:
        return val;
    }
  }

  private runCallbacks(onChangeCallbacks: OnChangeCallBack[], changedAttrs: string[]): void {

    if (isNullOrUndefined(onChangeCallbacks) || isNullOrUndefined(changedAttrs)) return;

    onChangeCallbacks
      .filter((onChangeCallback) => {

        for (let triggerAttr of onChangeCallback.triggerAttrs) {

          if (changedAttrs.indexOf(triggerAttr) != -1) return true;
        }

        return false;
      })
      .forEach((onChangeCallback) => onChangeCallback.callbackFn());
  }
}
