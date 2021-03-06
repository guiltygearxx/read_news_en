import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";
import {DATE_FORMAT, DATE_TIME_FORMAT} from "./application-constants";
import * as moment from "moment";
import BigNumber from "bignumber.js";
import {i18n} from "./i18n";
import {NewsView} from "../bean/news-view";
import {Router} from "@angular/router";
import {NewsCardCommon} from "../ui-component/common/news-card-common";

declare var $: any;

@Injectable()
export class ApplicationUtils {

    constructor(protected router: Router) {
    }

    randomNumber(): number {

        return Math.random();
    }

    isStringEmpty(str: string): boolean {

        return (isNullOrUndefined(str) || !str.length) ? true : false;
    }

    isDateFormat(value: string): boolean {

        if (this.isStringEmpty(value)) return false;

        let value_: string = value.toString().trim();

        return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value_);
    }

    formatDate(date: Date) {

        if (isNullOrUndefined(date)) return null;

        return moment(date).format(DATE_FORMAT);
    }

    formatDateTime(date: Date) {

        if (isNullOrUndefined(date)) return null;

        return moment(date).format(DATE_TIME_FORMAT);
    }

    convertStringToDate(dateStr: string): Date {

        if (isNullOrUndefined(dateStr)) return null;

        return moment(dateStr, DATE_FORMAT).toDate();
    }

    isNumberFormat(value: string): boolean {

        if (isNullOrUndefined(value)) return false;

        let value_: string = value.toString().trim();

        value_ = value_.replace(/\./g, "");

        if (this.isStringEmpty(value_)) return false;

        return /^[-]?\d+(,\d+)?$/.test(value_);
    }

    formatNumber(value: string, decimalLength: number): string {

        if (this.isStringEmpty(value)) return "";

        return this.formatBigNumber(this.convertStringToBigNumber(value), decimalLength);
    }

    formatBigNumber(value: BigNumber, decimalLength: number): string {

        if (isNullOrUndefined(value)) return "";

        return value.toFormat(decimalLength);
    }

    convertStringToBigNumber(value: string): BigNumber {

        if (this.isStringEmpty(value)) return null;

        //normalize value;
        value = value.replace(/\./g, "").replace(",", ".");

        let number_: BigNumber = new BigNumber(value);

        return number_;
    }

    formatNumber2(value: number, decimalLength: number): string {

        if (isNullOrUndefined(value)) return "";

        let value_ = value.toString().replace(/\./, ",");

        return this.formatNumber(value_, decimalLength);
    }

    compareString(str1: string, str2: string): number {

        if (isNullOrUndefined(str1)) {

            str1 = "";
        }

        if (isNullOrUndefined(str2)) {

            str2 = "";
        }

        return str1.localeCompare(str2);
    }

    message(code: string, params ?: any[]) {

        let message = i18n[code];

        if (this.isStringEmpty(message)) {

            message = code;
        } else {

            if (!isNullOrUndefined(params) && params.length > 0) {

                let paramIndex: number = 0;

                for (let param of params) {

                    if (isNullOrUndefined(param)) param = "";

                    message = message.split("{" + paramIndex + "}").join(param);

                    paramIndex++;
                }
            }
        }

        return message;
    }

    getShortContent(value: string, maxLength: number): string {

        return !this.isStringEmpty(value) && value.length > maxLength ? (value.substr(0, maxLength - 3) + "...") : value;
    }

    removeUnicode(alias: string): string {

        var str = alias;

        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        str = str.replace(/ + /g, " ");
        str = str.trim();

        return str;
    }

    convertTitleToURLParam(title: string): string {

        return this.removeUnicode(title).split(/\s+/).join("-");
    }

    viewNewsDetail(newsCard: NewsCardCommon): void {

        let news: NewsView = newsCard.news;

        let title: string = this.convertTitleToURLParam(news.title);

        this.router.navigate(['/newsDetail/', title, news.id]).then();
    }

    viewNewsMobileDetail(newsCard: NewsCardCommon): void {

        let news: NewsView = newsCard.news;

        let title: string = this.convertTitleToURLParam(news.title);

        this.router.navigate(['/mobileDetail/', title, news.id]).then();
    }

    scrollTopTop(completeFn ?: (() => void)): void {

        $("html, body").stop().animate({scrollTop: 0}, 500, 'swing', completeFn);
    }
}
