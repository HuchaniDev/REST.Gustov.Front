import {ItemSummary} from "./item-sumary.interface";

export interface ItemCategoriesInterface {
    categoryId:number;
    categoryName:string;
    categoryDescription:string;
    items:ItemSummary[];
    isCollapsed:boolean|false;
}