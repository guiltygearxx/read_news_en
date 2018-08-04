import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../bean/category";
import {ALL_CATEGORIES, ALL_CATEGORIES_MOBILE} from "../../service/category-fixed-datasource";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";
import {ApplicationUtils} from "../../common/application-utils";
import {
    CATEGORY_ID_TINCHINH,
    CATEGORY_ID_TINNOIBAT,
    CATEGORY_ID_TINNONG,
    CATEGORY_ID_VIDEO
} from "../../common/application-constants";
import {CategoryService} from "../../service/category.service";

declare var $: any;

const RELOAD_NEWS_AFTER_MENU_CLICKED_TIMEOUT = 300;

@Component({
    selector: 'app-m-header',
    templateUrl: './m-header.component.html',
    styleUrls: ['./m-header.component.css']
})
export class MHeaderComponent implements OnInit {

    categories: Category[];

    openingParentMenu: any;

    @ViewChild("navbarToggleButton")
    navbarToggleButton: ElementRef;

    constructor(protected router: Router,
                protected applicationUtils: ApplicationUtils,
                protected categoryService: CategoryService) {
    }

    ngOnInit() {

        this.loadCategories();
    }

    getCategories(parentCategory: Category): Category[] {

        let parentCategoryId = parentCategory ? parentCategory.id : null;

        return this.categories.filter(item => item.parentCategoryId == parentCategoryId);
    }

    isHasSubCategories(parentCategory: Category): boolean {

        let parentCategoryId = parentCategory ? parentCategory.id : null;

        let subCategory = this.categories.find(item => item.parentCategoryId == parentCategoryId);

        return !isNullOrUndefined(subCategory);
    }

    viewTinNongTopic(event: any): void {

        this.goToTopic(CATEGORY_ID_TINNONG);
    }

    viewTinMoiTopic(event: any): void {

        this.goToTopic(CATEGORY_ID_TINNOIBAT);
    }

    viewTinChinhTopic(event: any): void {

        this.goToTopic(CATEGORY_ID_TINCHINH);
    }

    viewVideoTopic(event: any): void {

        this.goToTopic(CATEGORY_ID_VIDEO);
    }

    viewTopic(event: any, categoryId: string): void {

    }

    goToTopic(categoryId: string): void {

        // console.log("goToTopic: " + categoryId);

        let category = this.categoryService.getById(categoryId);

        this.router.navigate(['mobile/chuDe', category.code, categoryId]);
    }

    parentMenuClicked(event: any, category: Category): void {

        // console.log(event.currentTarget);

        let parentMenu: any = event.currentTarget;

        if ($(parentMenu).is(this.openingParentMenu)) {

            $(this.navbarToggleButton.nativeElement).trigger("click");

            setTimeout(() => this.goToTopic(category.id), RELOAD_NEWS_AFTER_MENU_CLICKED_TIMEOUT);

        } else {

            $(this.openingParentMenu).removeClass("open");

            this.openingParentMenu = parentMenu;

            $(parentMenu).addClass("open");
        }
    }

    childMenuClicked(event: any, category: Category): void {

        event.stopPropagation();

        $(this.navbarToggleButton.nativeElement).trigger("click");

        setTimeout(() => this.goToTopic(category.id), RELOAD_NEWS_AFTER_MENU_CLICKED_TIMEOUT);
    }

    singleMenuClicked(event: any, category: Category): void {

        let menu: any = event.currentTarget;

        if (!$(menu).is(this.openingParentMenu)) {

            $(this.openingParentMenu).removeClass("open");

            this.openingParentMenu = menu;
        }

        $(this.navbarToggleButton.nativeElement).trigger("click");

        setTimeout(() => this.goToTopic(category.id), RELOAD_NEWS_AFTER_MENU_CLICKED_TIMEOUT);
    }

    protected loadCategories(): void {

        this.categories = ALL_CATEGORIES_MOBILE;
    }
}
