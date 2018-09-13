import {BaseDomain} from "../common/base-domain";

export class News implements BaseDomain {

    id: string;
    isDeleted: boolean;
    lastModifiedTime: string;
    lastModifiedUser: string;

    title: string;
    link: string;
    pubDate: string;
    guid: string;
    description: string;
    rssSourceGroupId: string;
    createdTime: string;
}