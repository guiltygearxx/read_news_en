import {BaseDomain} from "../common/base-domain";

export class NewsContent implements BaseDomain {

    id: string;
    isDeleted: boolean;
    lastModifiedTime: string;
    lastModifiedUser: string;

    content: string;
}