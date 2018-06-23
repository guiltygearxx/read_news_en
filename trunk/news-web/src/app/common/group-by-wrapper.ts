import {isNullOrUndefined} from "util";

export class GroupByWrapper<T> {

  private mapping: any;

  groupBy(items: T[], closures: ((item: T) => any)[]): void {

    if (isNullOrUndefined(items)) return null;

    let mapping: any = this.mapping = {};

    items.forEach((item) => {

      let mapping_ = mapping;

      closures.forEach((closure, index) => {

        let key = closure(item);

        if (index == closures.length - 1) {

          let subMapping: any[] = mapping_[key];

          if (isNullOrUndefined(subMapping)) mapping_[key] = subMapping = [];

          subMapping.push(item);

        } else {

          let subMapping = mapping_[key];

          if (isNullOrUndefined(subMapping)) mapping_[key] = subMapping = {};

          mapping_ = subMapping;
        }
      });
    });
  }

  getItem(keys: any[]): T {

    let items = this.getItems(keys);

    return isNullOrUndefined(items) ? null : items[0];
  }

  getItems(keys: any[]): T[] {

    if (isNullOrUndefined(keys) || isNullOrUndefined(this.mapping)) return null;

    let mapping = this.mapping;

    for (let index = 0; index < keys.length; index++) {

      let subMapping: any = mapping[keys[index]];

      if (isNullOrUndefined(subMapping)) return null;

      mapping = subMapping;
    }

    return mapping;
  }
}
