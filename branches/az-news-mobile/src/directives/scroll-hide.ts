import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {ScrollEvent} from "ionic-angular";

/**
 * Generated class for the ScrollHideDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[scroll-hide]', // Attribute selector
  host: {
    "(ionScrollStart)": "onContentScrollStart($event)",
    "(ionScroll)": "onContentScroll($event)"
  }
})
export class ScrollHideDirective implements OnInit {

  @Input("header")
  header: HTMLElement;

  headerHeight: number;

  scrollContent: any;

  scrollTop: number;

  isHidden: boolean = false;

  constructor(public element: ElementRef,
              public renderer: Renderer2) {
  }

  ngOnInit(): void {

    this.headerHeight = this.header.clientHeight;

    this.renderer.setStyle(this.header, "webkitTransition", "top 700ms");

    this.scrollContent = this.element.nativeElement.getElementsByClassName("scroll-content")[0];

    this.renderer.setStyle(this.scrollContent, "webkitTransition", "margin-top 700ms");
  }

  onContentScrollStart(event: ScrollEvent): void {

    this.scrollTop = event.scrollTop;
  }

  onContentScroll(event: ScrollEvent): void {

    let diffScrollTop = event.scrollTop - this.scrollTop;

    this.adjustHeader(diffScrollTop);
  }

  private adjustHeader(diffScrollTop: number): void {

    if (diffScrollTop > this.headerHeight) {

      if (!this.isHidden) {

        this.renderer.setStyle(this.header, "top", (-this.headerHeight) + "px");

        this.renderer.setStyle(this.scrollContent, "margin-top", "0px");

        this.isHidden = true;
      }

    } else if (diffScrollTop < -this.headerHeight) {

      if (this.isHidden) {

        this.renderer.setStyle(this.header, "top", "0px");

        this.renderer.setStyle(this.scrollContent, "margin-top", this.headerHeight + "px");

        this.isHidden = false;
      }
    }
  }

}
