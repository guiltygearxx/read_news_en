import {isNullOrUndefined, isNumber, isString} from "util";
import {ApplicationUtils} from "../application-utils";
import {DECIMAL_LENGTH} from "../application-constants";
import {Injectable} from "@angular/core";

@Injectable()
export class NumberFormatter {

  constructor(protected applicationUtils: ApplicationUtils) {
  }

  format(value: any): string {

    if (isNullOrUndefined(value)) return "";

    if (isString(value)) {

      if (!this.applicationUtils.isNumberFormat(value)) return value;

      return this.applicationUtils.formatNumber(value, DECIMAL_LENGTH);

    } else if (isNumber(value)) {

      return this.applicationUtils.formatNumber2(value, DECIMAL_LENGTH);
    }
  }
}
