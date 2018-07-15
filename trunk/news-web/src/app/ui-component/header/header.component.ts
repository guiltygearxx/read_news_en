import {Component, OnInit} from '@angular/core';
import {Category} from "../../bean/category";
import {ALL_CATEGORIES} from "../../service/category-fixed-datasource";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    categories: Category[];

    constructor() {
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

    protected loadCategories(): void {

        this.categories = ALL_CATEGORIES;
    }


}
