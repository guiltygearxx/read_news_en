export class OnChangeCallBack {

  triggerAttrs: string[];
  callbackFn: (() => void);

  constructor(triggerAttr: string[], callbackFn: () => void) {

    this.triggerAttrs = triggerAttr;
    this.callbackFn = callbackFn;
  }
}
