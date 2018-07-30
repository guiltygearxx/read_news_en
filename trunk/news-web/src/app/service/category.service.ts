import {Injectable} from "@angular/core";
import {ALL_CATEGORIES} from "./category-fixed-datasource";
import {Category} from "../bean/category";

@Injectable()
export class CategoryService {

    getAllCategoryIdsByParentCategoryId(parentCategoryId: string): string[] {

        let allCategories = ALL_CATEGORIES;

        let categoryIds: string[] = [parentCategoryId];

        let categoryId_;

        let index: number = 0;

        while (index < categoryIds.length) {

            categoryId_ = categoryIds[index];

            allCategories.forEach((category) => (category.parentCategoryId == categoryId_) && (categoryIds.push(category.id)));

            index++;
        }

        return categoryIds;
    }

    getById(categoryId: string): Category {

        return ALL_CATEGORIES.find((item) => item.id == categoryId);
    }
}