import {Component, OnInit} from '@angular/core';
import {Category} from "../../bean/category";
import {ALL_CATEGORIES, ALL_CATEGORIES_MOBILE} from "../../service/category-fixed-datasource";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";
import {ApplicationUtils} from "../../common/application-utils";
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
    selector: 'app-m-header',
    templateUrl: './m-header.component.html',
    styleUrls: ['./m-header.component.css']
})
export class MHeaderComponent implements OnInit {

    categories: Category[];

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

    viewNewsTopic($event: any, idTopic: string): void {

        $event.preventDefault();

        this.router.navigate(['mobile/chuDe', idTopic]);
    }

    protected loadCategories(): void {

        this.categories = ALL_CATEGORIES;
    }

}
