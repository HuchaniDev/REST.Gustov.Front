import {Component, inject, signal} from "@angular/core";
import {DialogHeaderComponent} from "../../../../../shared/controls/dialog-header";
import {DialogService} from "../../../../../shared/controls/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DefaultButtonDirective} from "../../../../../shared/directives/default-button.directive";
import {ButtonDirective} from "../../../../../shared/directives/button.directive";
import {InputDirective} from "../../../../../shared/directives/input.directive";
import {LoaderComponent} from "../../../../../shared/controls/loader";
import {CategoryService} from "../../../services/category.service";
import {finalize} from "rxjs";
import {ApiResponseInterface} from "../../../../../core/Models/api-response.interface";
import {CategoryInterface} from "../../../models/category/category.interface";

@Component({
    selector: "category-form",
    templateUrl: "./category-form.component.html",
    standalone: true,
    imports: [
        DialogHeaderComponent,
        ReactiveFormsModule,
        DefaultButtonDirective,
        ButtonDirective,
        DefaultButtonDirective,
        InputDirective,
        LoaderComponent,
    ]
})
export class CategoryFormComponent {
    #dialogService = inject(DialogService);
    #categoryService = inject(CategoryService);

    categoryId: number |null = this.#dialogService.dialogConfig?.data?.categoryId;
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
        this.message.set('guardando...');
        if(this.formGroup.valid){
            console.log(this.formGroup.value)
            this.#categoryService.save$(this.formGroup.value)
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

    deleteCategory(){
        if(this.categoryId&& this.categoryId>0){
            this.isProcessing.set(true);
            this.message.set('eliminando...');
            this.#categoryService.delete$(this.categoryId)
                .pipe(finalize(()=>this.isProcessing.set(false)))
                .subscribe({
                    next: (response) => {
                        this.close(true);
                    },
                    error: (error) => {
                        this.message = error.error.errors;
                        console.log('error',error);
                    }
                });
        }
    }

    #initializeComponent(){
        this.formGroup = new FormGroup({
            id: new FormControl<number|null>(this.categoryId),
            name: new FormControl<string|null>(null,[Validators.required]),
            description: new FormControl<string>('',),
        });
    }

    #loadData(){
        if(this.categoryId&& this.categoryId>0){
            this.isProcessing.set(true);
            this.message.set('cargando...');
            this.#categoryService.getById$(this.categoryId)
                .pipe(finalize(()=>this.isProcessing.set(false)))
                .subscribe({
                    next: (response:ApiResponseInterface<CategoryInterface>) => {
                        this.formGroup.setValue(
                            {
                                id: response.data.id,
                                name: response.data.name,
                                description: response.data.description
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