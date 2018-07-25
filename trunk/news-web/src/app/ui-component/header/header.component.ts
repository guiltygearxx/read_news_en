import {Component, OnInit} from '@angular/core';
import {Category} from "../../bean/category";
import {ALL_CATEGORIES} from "../../service/category-fixed-datasource";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    categories: Category[];

    constructor(protected router: Router) {
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

    openMenu(event: any): void {

        setTimeout(() => {

            $(event.target).is(":hover") && $(event.target).addClass("open");

        }, 100)
    }

    closeMenu(event: any): void {

        setTimeout(() => {

            !$(event.target).is(":hover") && $(event.target).removeClass("open");

        }, 100)
    }

    openCategory(event: any, category: Category): void {

        event.stopPropagation();

        this.router.navigate(['desktop/chuDe/', category.id]);
    }

    protected loadCategories(): void {

        this.categories = ALL_CATEGORIES;
    }
}
