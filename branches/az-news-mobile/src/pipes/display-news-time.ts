import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import * as moment from "moment";

/**
 * Generated class for the DisplayNewsTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'displayNewsTime',
})
export class DisplayNewsTimePipe implements PipeTransform {

  constructor(protected translate: TranslateService) {
  }

  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {

    if (!value) return null;

    // let date = moment(value);

    let date = moment.utc(value);

    let now = moment(args && args.length ? args[0] : new Date());

    let diff = now.diff(date, "minute");

    if (diff < 60)
      return this.translate.instant("newTimes.lessThan1Hour", {value: diff});

    if (diff < 60 * 24)
      return this.translate.instant("newTimes.moreThan1Hour", {value: Math.round(diff / 60)});

    if (diff < 60 * 24 * 7)
      return this.translate.instant("newTimes.moreThan1Day", {value: Math.round(diff / 60 / 24)});

    if (diff < 60 * 24 * 30)
      return this.translate.instant("newTimes.moreThan1Week", {value: Math.round(diff / 60 / 24 / 7)});

    return this.translate.instant("newTimes.moreThan1Month", {value: Math.round(diff / 60 / 24 / 30)});
  }
}
