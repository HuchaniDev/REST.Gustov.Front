import {Component, inject, signal} from "@angular/core";
import {ItemCategoriesInterface} from "../../../models/item-categories.interface";
import {NgClass, NgStyle, TitleCasePipe} from "@angular/common";
import {SwitchButtonComponent} from "../../../../../shared/controls/check-box-switch/check-box-switch.component";
import {ItemsService} from "../../../services/Items.service";
import {finalize} from "rxjs";
import {ApiResponseInterface} from "../../../../../core/Models/api-response.interface";
import {StatusEnum} from "../../../../../core/enums/status-enum";
import {InputDirective} from "../../../../../shared/directives/input.directive";
import {DialogService} from "../../../../../shared/controls/dialog";
import {CategoryFormComponent} from "../category-form/category-form.component";
import {ItemFormComponent} from "../item-form/item-form.component";
import {DeleteAlertComponent} from "../../../../../shared/controls/delete-alert/delete-alert.component";
import {ItemSummary} from "../../../models/item-sumary.interface";

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    standalone: true,
    imports: [
        NgClass,
        SwitchButtonComponent,
        TitleCasePipe,
        NgStyle,
        InputDirective
    ]
})
export default class MenuComponent{
    #itemsService= inject(ItemsService);
    #dialogService= inject(DialogService);

    isProcessing=signal<boolean>(false);
    showMenu = signal<number>(0);
    itemCategories:ItemCategoriesInterface[]=[]
    statusList = Object.values(StatusEnum);

    constructor() {
        this.getItems();
    }

    toggleCategory(category:ItemCategoriesInterface){
       category.isCollapsed = !category.isCollapsed;
    }

    OpenFormCategory(categoryId:number=0){
        console.log('nueva categoria',)
        this.#dialogService.open(CategoryFormComponent,{
            size:{
                width: '800px',
                minWidth: '350px',
                maxWidth: '95%',
                height: 'auto',
                maxHeight: '80%'
            },
            data:{categoryId:categoryId}
        }).afterClosed()
        .subscribe({
            next: (value:boolean)=> {
                if(value){
                    this.getItems();
                }
            },
            error: (e)=> {
                console.error(e);
            }
        })
    }
    openItemForm(categoryId:number,itemId:number=0){
        console.log('nuevo item',categoryId);
        this.#dialogService.open(ItemFormComponent,{
            size:{
                width: '800px',
                minWidth: '350px',
                maxWidth: '95%',
                height: 'auto',
                maxHeight: '80%'
            },
            data:{categoryId:categoryId,itemId:itemId}
        }).afterClosed()
            .subscribe({
                next: (value:boolean)=> {
                    if(value){
                        this.getItems();
                    }
                },
                error: (e)=> {
                    console.error(e);
                }
            })
    }

    changeStatus(item:ItemSummary,status:boolean){
        console.log('chage status',status,item);
        this.#itemsService.changeStatus$(item.id,status).subscribe({
            next: (value)=> {
                item.status = status;
            },
            error: (e)=> {
                item.status = !status;
                console.log(e);
            }
        });
    }


    deleteItem(itemId:number, name:string=''){
        this.#dialogService.open(DeleteAlertComponent,{
            size:{
                width: '500px',
                minWidth: '350px',
                maxWidth: '50%',
                height: 'auto',
                maxHeight: '80%'
            },
            data:{
                title:'Eliminar',
                message:`¿Está seguro de eliminar el Item ${name}?`
            }
        })
            .afterClosed()
            .subscribe({
                next: (value:boolean)=> {
                    if(value){
                      this.deleteConfirm(itemId);
                    }
                },
                error: (e)=> {
                    console.log(e);
                }
            });
        console.log('elim item',itemId);
    }

    deleteConfirm(itemId:number){
        this.#itemsService.deleteItem$(itemId).subscribe({
            next: (value)=> {
                this.getItems();
            },
            error: (e)=> {
                console.log(e);
            }
        })

    }

    getItems(){
        this.#itemsService.getItemsAll$()
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

    getStockColor(stock: number): string {
        if (stock === 0) return 'red';       // Sin stock
        if (stock <= 5) return 'orange';     // Pocas unidades
        return 'green';                      // Stock suficiente
    }

}