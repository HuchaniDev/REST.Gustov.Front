import {ItemSummaryInterface} from "./item-sumary.interface";

export interface ItemCategoriesInterface {
    categoryId:number;
    categoryName:string;
    categoryDescription:string;
    items:ItemSummaryInterface[];
    isCollapsed:boolean|false;
}