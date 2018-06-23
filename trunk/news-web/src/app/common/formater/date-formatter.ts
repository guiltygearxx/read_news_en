import {Formatter} from "./formatter";
import {isNullOrUndefined} from "util";
import {ApplicationUtils} from "../application-utils";
import {Injectable} from "@angular/core";

@Injectable()
export class DateFormatter implements Formatter {

  constructor(protected applicationUtils: ApplicationUtils) {
  }

  private normalize(value: string): string {

    let dateElements: string[] = value.split("/");

    for (let index = 0; index < 3; index++) {

      if (dateElements[index].length == 1) dateElements[index] = "0" + dateElements[index];
    }

    return dateElements.join("/");
  }

  format(value: any): string {

    if (isNullOrUndefined(value)) return "";

    if (!this.applicationUtils.isDateFormat(value)) return value;

    return this.applicationUtils.formatDate(this.applicationUtils.convertStringToDate(this.normalize(value)));
  }
}
