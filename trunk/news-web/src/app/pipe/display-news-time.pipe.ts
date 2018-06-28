import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment";
import {ApplicationUtils} from "../common/application-utils";
import BigNumber from "bignumber.js";

@Pipe({name: 'displayNewsTime'})
export class DisplayNewsTimePipe implements PipeTransform {

    constructor(protected applicationUtils: ApplicationUtils) {
    }

    transform(value: any, ...args: any[]): any {

        if (!value) return null;

        // let date = moment(value);

        let date = moment.utc(value);

        let now = moment(args && args.length ? args[0] : new Date());

        let diff = now.diff(date, "minute");

        if (diff < 60)
            return this.applicationUtils.message("newTimes.lessThan1Hour", [diff]);

        if (diff < 60 * 24)
            return this.applicationUtils.message("newTimes.moreThan1Hour", [Math.round(diff / 60)]);

        if (diff < 60 * 24 * 7)
            return this.applicationUtils.message("newTimes.moreThan1Day", [Math.round(diff / 60 / 24)]);

        if (diff < 60 * 24 * 30)
            return this.applicationUtils.message("newTimes.moreThan1Week", [Math.round(diff / 60 / 24 / 7)]);

        return this.applicationUtils.message("newTimes.moreThan1Month", [Math.round(diff / 60 / 24 / 30)]);
    }
}