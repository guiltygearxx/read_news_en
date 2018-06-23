import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {DateFormatter} from "./formater/date-formatter";
import {NumberFormatter} from "./formater/number-formatter";
import {ApplicationUtils} from "./application-utils";
import {ComponentUtils} from "./component-utils";
import {BrowserModule} from "@angular/platform-browser";
import {ValidateUtils} from "./validate/validate-utils";

@NgModule({

  declarations: [
  ],

  imports: [
    BrowserModule,
    FormsModule,
  ],

  exports: [
  ],

  providers: [
    DateFormatter,
    NumberFormatter,
    ApplicationUtils,
    ComponentUtils,
    ValidateUtils
  ],

  entryComponents: [
  ],
})
export class AppBaseModule {
}
