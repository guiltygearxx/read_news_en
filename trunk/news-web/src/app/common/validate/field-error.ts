import {Error} from "../error";

export class FieldError extends Error {

  field: string;
}
