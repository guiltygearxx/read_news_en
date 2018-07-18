import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {DeviceDetectorService} from "ngx-device-detector";
import {Injectable} from "@angular/core";

@Injectable()
export class MobileCanActivate implements CanActivate {

    constructor(protected deviceDetectorService: DeviceDetectorService,
                protected router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        let isMobile = this.deviceDetectorService.isMobile();

        (!isMobile) && (this.router.navigate(["desktop"]));

        return isMobile;
    }
}