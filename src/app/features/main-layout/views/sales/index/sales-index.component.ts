import {Component, inject, signal} from "@angular/core";
import {SwitchButtonComponent} from "../../../../../shared/controls/check-box-switch/check-box-switch.component";
import {CommonModule, TitleCasePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputDirective} from "../../../../../shared/directives/input.directive";
import {CategoryService} from "../../../services/category.service";
import {ApiResponseInterface} from "../../../../../core/Models/api-response.interface";
import {CategoryInterface} from "../../../models/category/category.interface";
import {ItemsService} from "../../../services/Items.service";
import {ItemCategoriesInterface} from "../../../models/item-categories.interface";

@Component({
    selector: "app-sales-index",
    templateUrl: "sales-index.component.html",
    standalone: true,
    imports: [
        SwitchButtonComponent,
        TitleCasePipe,
        FormsModule,
        InputDirective,
        ReactiveFormsModule,
        CommonModule
    ]
})
export default class SaleIndexComponent {
    #categoryService= inject(CategoryService);
    #itemsService= inject(ItemsService);
    searchTerm='';

    categories:CategoryInterface[]=[];
    categorySelectedId=signal<number>(0);

    categoriesItems:ItemCategoriesInterface[]=[];

    constructor() {
        this.getCategories();
    }

    getCategories(){
        this.#categoryService.getCategories$().subscribe({
            next: (response:ApiResponseInterface<CategoryInterface[]>) => {
                this.categories = response.data;
                if(this.categories.length > 0){
                    this.selectedCategory(this.categories[0].id);
                    this.getItems();
                }
            },
            error: (error) => {
                console.log(error);
            }
        })
    }
    selectedCategory(categoryId:number){
        this.categorySelectedId.set(categoryId);
        this.getItems();
    }

    getItems(){
        this.#itemsService. getItemsFilter$(this.searchTerm,this.categorySelectedId()).subscribe({
            next: (response:ApiResponseInterface<ItemCategoriesInterface[]>) => {
                this.categoriesItems = response.data;
            }
        })
    }

    getStockColor(stock: number): string {
        if (stock === 0) return 'red';       // Sin stock
        if (stock <= 5) return 'orange';     // Pocas unidades
        return 'green';                      // Stock suficiente
    }
}