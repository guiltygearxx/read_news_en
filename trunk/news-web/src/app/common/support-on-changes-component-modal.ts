import {OnChangeCallBack} from "./on-change-call-back";

export interface SupportOnChangesComponentModal {

  contentChangedAttrs: string[];
  viewChangedAttrs: string[];

  afterContentCheckCallbacks: OnChangeCallBack[];
  afterViewCheckCallbacks: OnChangeCallBack[];
}
