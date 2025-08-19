import {Component, inject, signal} from "@angular/core";
import {ItemCategoriesInterface} from "../../../models/item-categories.interface";
import {NgClass} from "@angular/common";
import {SwitchButtonComponent} from "../../../../../shared/controls/check-box-switch/check-box-switch.component";
import {ItemsService} from "../../../services/Items.service";
import {finalize} from "rxjs";
import {ApiResponseInterface} from "../../../../../core/Models/api-response.interface";

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    standalone: true,
    imports: [
        NgClass,
        SwitchButtonComponent
    ]
})
export default class MenuComponent{
    #itemsService= inject(ItemsService);

    isProcessing=signal<boolean>(false);
    itemCategories:ItemCategoriesInterface[]=[]

    constructor() {
        this.getItems();
    }

    toggleCategory(category:ItemCategoriesInterface){
       category.isCollapsed = !category.isCollapsed;
    }

    newCategory(){
        console.log('nueva categoria',)
    }
    openItemForm(categoryId:number,itemId:number){
        console.log('nuevo item',categoryId);
    }
    changeStatus(value:boolean){
        console.log('chage status',value)
    }
    deleteItem(itemId:number){
        console.log('elim item',itemId);
    }

    getItems(){
        this.#itemsService.getItemsFilter()
            .pipe(
                finalize(()=>{
                    this.isProcessing.set(false)
                })
            )
            .subscribe({
                next: (response:ApiResponseInterface<ItemCategoriesInterface[]>)=> {
                    this.itemCategories = response.data;
                },
                error: (e) => {
                    console.log(e);
                }
            })
    }
}