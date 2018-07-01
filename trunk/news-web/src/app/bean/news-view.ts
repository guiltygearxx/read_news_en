import {BaseDomain} from "../common/base-domain";

export class NewsView implements BaseDomain {

    id: string;
    isDeleted: boolean;
    lastModifiedTime: string;
    lastModifiedUser: string;

    categoryId: string;
    title: string;
    link: string;
    pubDate: string;
    guid: string;
    description: string;
    newsId: string;
    rssSourceGroupId: string;
    rssSourceGroupTitle: string;
    typeContent: string;
}