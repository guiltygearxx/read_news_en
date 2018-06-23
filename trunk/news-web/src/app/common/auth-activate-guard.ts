import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {ApplicationService} from "./application.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class AuthActivateGuard implements CanActivate {

  constructor(protected applicationService: ApplicationService,
              protected router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (isNullOrUndefined(this.applicationService.accessToken)) {

      this.router.navigate(["login"]);

      return false;
    }

    return true;
  }
}
