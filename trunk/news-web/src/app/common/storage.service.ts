import {Injectable} from "@angular/core";
import {isNullOrUndefined} from "util";

@Injectable()
export class StorageService {

  private getFromStorage(key: string, storage: Storage): any {

    let value: string = storage.getItem(key);

    return value;
  }

  private setToStorage(key: string, value: any, storage: Storage): void {

    if (isNullOrUndefined(value)) {

      storage.removeItem(key);
    } else {

      storage.setItem(key, value);
    }
  }

  getFromSessionStorage(key: string): any {

    return this.getFromStorage(key, sessionStorage);
  }

  setToSessionStorage(key: string, value: any): void {

    this.setToStorage(key, value, sessionStorage);
  }

  getFromLocalStorage(key: string): any {

    return this.getFromStorage(key, localStorage);
  }

  setToLocalStorage(key: string, value: any): void {

    this.setToStorage(key, value, localStorage);
  }
}
