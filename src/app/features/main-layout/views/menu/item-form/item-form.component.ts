import {Component, inject, signal} from "@angular/core";
import {ButtonDirective} from "../../../../../shared/directives/button.directive";
import {DefaultButtonDirective} from "../../../../../shared/directives/default-button.directive";
import {DialogHeaderComponent} from "../../../../../shared/controls/dialog-header";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputDirective} from "../../../../../shared/directives/input.directive";
import {LoaderComponent} from "../../../../../shared/controls/loader";
import {DialogService} from "../../../../../shared/controls/dialog";
import {finalize} from "rxjs";
import {ApiResponseInterface} from "../../../../../core/Models/api-response.interface";
import {ItemInterface} from "../../../models/items/item.interface";
import {ItemsService} from "../../../services/Items.service";

@Component({
    selector: "item-form",
    templateUrl: "item-form.component.html",
    standalone: true,
    imports: [
        ButtonDirective,
        DefaultButtonDirective,
        DialogHeaderComponent,
        FormsModule,
        InputDirective,
        LoaderComponent,
        ReactiveFormsModule
    ]
})
export class ItemFormComponent {
    #dialogService = inject(DialogService);
    #itemService = inject(ItemsService);

    categoryId: number |null = this.#dialogService.dialogConfig?.data?.categoryId;
    itemId: number |null = this.#dialogService.dialogConfig?.data?.itemId;
    formGroup!:FormGroup;
    isProcessing=signal<boolean>(false)
    message=signal<string>('')

    constructor() {
        this.#initializeComponent();
        this.#loadData();
    }

    close(value:boolean){
        this.#dialogService.close(value);
    }

    save(){
        this.isProcessing.set(true);
        this.message.set('guardando...')
        if(this.formGroup.valid){
            console.log(this.formGroup.value)
            this.#itemService.save$(this.formGroup.value)
                .pipe(
                    finalize(() => {
                        this.isProcessing.set(false);
                    })
                )
                .subscribe({
                    next: (response) => {
                        if(response.isSuccess){
                            this.close(true);
                        }
                    },
                    error: (error) => {
                        this.message = error.error.errors;
                    }
                })
        }

    }

    #initializeComponent(){
        this.formGroup = new FormGroup({
            id: new FormControl<number|null>(this.itemId),
            name: new FormControl <string|null>(null,[Validators.required]),
            price: new FormControl<number|null>(null,[Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/),Validators.min(0)]),
            description: new FormControl<string>('',),
            stock: new FormControl<number>(1,[Validators.required,Validators.min(0)]),
            imageUrl: new FormControl<string|null>(null,[Validators.required]),
            categoryId:new FormControl<number|null>(this.categoryId,[Validators.required])
        });
    }

    #loadData(){
        if(this.itemId&& this.itemId>0){
            this.isProcessing.set(true);
            this.message.set('cargando...');
            this.#itemService.getById$(this.itemId)
                .pipe(finalize(()=>this.isProcessing.set(false)))
                .subscribe({
                    next: (response:ApiResponseInterface<ItemInterface>) => {
                        console.log(response)
                        this.formGroup.setValue(
                            {
                                id: response.data.id,
                                name: response.data.name,
                                price: response.data.price,
                                description: response.data.description,
                                stock:response.data.stock,
                                imageUrl:response.data.imageUrl,
                                categoryId:response.data.categoryId
                            }
                        );
                    },
                    error: (error) => {
                        this.message = error.error.errors;
                        console.log('error',error);
                        this.close(false);
                    }
                });
        }
    }
}