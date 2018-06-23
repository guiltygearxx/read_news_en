import {Error} from "./error";

export class ResultBean {

  isSuccess: boolean;
  errors: Error[];
  result: any
}
