import {BaseDomain} from "../common/base-domain";

export class Image implements BaseDomain {

    id: string;
    isDeleted: boolean;
    lastModifiedTime: string;
    lastModifiedUser: string;

    type: string;
    width: number;
    height: number;
    url: string;
    referenceId: string;
    referenceType: string;
}