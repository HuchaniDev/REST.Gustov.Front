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
import {OrderItemsModel} from "../../../models/sale/order-items.model";
import {ItemSummary} from "../../../models/item-sumary.interface";
import {SaleService} from "../../../services/sale.service";
import {SaleDetailTickedInterface} from "../../../models/sale/sale-detail-ticked.interface";
import {DialogService} from "../../../../../shared/controls/dialog";
import {ItemFormComponent} from "../../menu/item-form/item-form.component";
import {TickedShowComponent} from "../ticked-show/ticked-show.component";

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
    #saleService= inject(SaleService);
    #dialogService= inject(DialogService);

    searchTerm='';
    categories:CategoryInterface[]=[];
    categorySelectedId=signal<number>(0);
    categoriesItems:ItemSummary[]=[];
    orderItems:OrderItemsModel[]=[];

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
                this.categoriesItems = response.data[0].items;
            }
        })
    }

    getStockColor(stock: number): string {
        if (stock === 0) return 'red';       // Sin stock
        if (stock <= 5) return 'orange';     // Pocas unidades
        return 'green';                      // Stock suficiente
    }

    isStockValid(itemId:number): boolean {
        let s = this.categoriesItems.find(i => i.id === itemId);
        if (s) {
            return s.stock>0;
        }
        return false;
    }

    decrementStock(itemId:number){
        let s = this.categoriesItems.find(i => i.id === itemId);
        if (s && s.stock > 0) {
            s.stock--;
        }
    }

    incrementStock(itemId:number, quantity:number|null=null){
        let s = this.categoriesItems.find(i => i.id === itemId);
        if (s) {
            if(quantity)
                s.stock = s.stock+quantity;
            else
            s.stock++;
        }
    }


    //sale
    addOrderItem(item:ItemSummary){

        if(this.orderItems.some(i=>i.id === item.id)){
            return;
        }
        let itemOrder= new OrderItemsModel(
            item.id,
            item.name,
            item.price,
            item.imageUrl
        )
        this.orderItems.push(itemOrder);
       this.decrementStock(item.id);
    }

    deleteOrderItem(item:OrderItemsModel){
        this.orderItems=this.orderItems.filter(i => i.id !== item.id);
        this.incrementStock(item.id,item.quantity);
    }

    incrementItem(item:OrderItemsModel){
        if(this.isStockValid(item.id)){
            item.increment();
            this.decrementStock(item.id);
        }
    }
    decrementItem(item:OrderItemsModel){
        if(item.quantity > 1){
            let s = this.categoriesItems.find(i => i.id === item.id);
            if (s) {
                s.stock++; // devolvemos al stock general
            }
        }
        item.decrement();
    }

    getTotal():number{
        return this.orderItems.reduce((acc, item) => acc + item.subTotal, 0);
    }

    saveSale(){
        let items= this.orderItems.map(i=>({itemId:i.id,quantity:i.quantity,subTotal:i.subTotal}))
        console.log(items);
        this.#saleService.saveSale$(items).subscribe({
            next: (response:ApiResponseInterface<SaleDetailTickedInterface>) => {
                console.log(response);
                this.orderItems=[];
                this.openTicket(response.data)
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    openTicket(ticked:SaleDetailTickedInterface){
        this.#dialogService.open(TickedShowComponent,{
            size:{
                width: '800px',
                minWidth: '350px',
                maxWidth: '95%',
                height: 'auto',
                maxHeight: '80%'
            },
            data:ticked
        }).afterClosed()
            .subscribe({
                next: (value:boolean)=> {
                    this.getItems();
                },
                error: (e)=> {
                    console.error(e);
                }
            })
    }
}