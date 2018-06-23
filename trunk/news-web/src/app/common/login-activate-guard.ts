import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";
import {ApplicationService} from "./application.service";

@Injectable()
export class LoginActivateGuard implements CanActivate {

  constructor(protected applicationService: ApplicationService,
              protected router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!isNullOrUndefined(this.applicationService.accessToken)) {

      this.router.navigate(["starter"]);

      return false;
    }

    return true;
  }
}
