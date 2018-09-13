import {Directive, HostListener, Input} from '@angular/core';
import {Router} from "@angular/router";

@Directive({
    selector: '[appNewsDetailMobileLink]'
})
export class NewsDetailMobileLinkDirective {

    @Input()
    hasDetail: boolean;

    @Input()
    newsId: string;

    @Input()
    title: string;

    constructor(protected router: Router) {
    }

    @HostListener('click')
    onMouseLeave(): boolean {

        this.hasDetail && this.router.navigate(['/mobile/noiDung', this.title, this.newsId]).then();

        return !this.hasDetail;
    }
}
