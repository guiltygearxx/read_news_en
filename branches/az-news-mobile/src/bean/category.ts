import {BaseDomain} from "../common/base-domain";

export class Category implements BaseDomain {

  id: string;
  isDeleted: boolean;
  lastModifiedTime: string;
  lastModifiedUser: string;

  title: string;
  code: string;
  parentCategoryId: string;
}
