import {Component, ElementRef, OnInit} from '@angular/core';
import {Category} from "../../bean/category";
import {ALL_CATEGORIES, ALL_CATEGORIES_MOBILE} from "../../service/category-fixed-datasource";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";
import {ApplicationUtils} from "../../common/application-utils";
import {ActivatedRoute} from '@angular/router';
import {CATEGORY_ID_TINCHINH, CATEGORY_ID_TINNONG, CATEGORY_ID_VIDEO} from "../../common/application-constants";

declare var $: any;

@Component({
    selector: 'app-m-header',
    templateUrl: './m-header.component.html',
    styleUrls: ['./m-header.component.css']
})
export class MHeaderComponent implements OnInit {

    categories: Category[];

    openingParentMenu: any;

    constructor(protected router: Router,
                protected applicationUtils: ApplicationUtils) {
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

    openSubMenus(event: any): void {

    }

    viewTinNongTopic(event: any): void {

        this.goToTopic(CATEGORY_ID_TINNONG);
    }

    viewTinMoiTopic(event: any): void {

        this.goToTopic(CATEGORY_ID_TINCHINH);
    }

    viewVideoTopic(event: any): void {

        this.goToTopic(CATEGORY_ID_VIDEO);
    }

    viewTopic(event: any, categoryId: string): void {

    }

    goToTopic(categoryId: string): void {

        console.log("goToTopic: " + categoryId);

        this.router.navigate(['mobile/chuDe', categoryId]);
    }

    parentMenuClicked(event: any, category: Category): void {

        let parentMenu: any = event.currentTarget;

        if ($(parentMenu).is(this.openingParentMenu)) {

            this.goToTopic(category.id);

        } else {

            $(this.openingParentMenu).removeClass("open");

            this.openingParentMenu = parentMenu;

            $(parentMenu).addClass("open");
        }
    }

    childMenuClicked(event: any, category: Category): void {

        event.stopPropagation();

        this.goToTopic(category.id);
    }

    protected loadCategories(): void {

        this.categories = ALL_CATEGORIES;
    }

}
