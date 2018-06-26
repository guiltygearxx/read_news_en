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

        return (diff < 60) ?
            this.applicationUtils.message("newTimes.lessThan1Hour", [diff]) :
            this.applicationUtils.message("newTimes.moreThan1Hour", [Math.round(diff / 60)]);
    }
}