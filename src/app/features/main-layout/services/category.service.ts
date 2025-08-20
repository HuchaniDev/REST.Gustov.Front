import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CategoryInterface} from "../models/category/category.interface";
import {ApiResponseInterface} from "../../../core/Models/api-response.interface";

@Injectable({
    providedIn: 'root'
})
export class CategoryService{

    #httpClient = inject(HttpClient);
    #endPoint = 'http://localhost:5286/category'

    save$(category:CategoryInterface){
        return this.#httpClient.post<ApiResponseInterface<object>>(`${this.#endPoint}`,category)
    }

    getCategories$(){
        return this.#httpClient.get<ApiResponseInterface<CategoryInterface[]>>(`${this.#endPoint}/all`)
    }

    getById$(categoryId:number){
        return this.#httpClient.get<ApiResponseInterface<CategoryInterface>>(`${this.#endPoint}/by-id/${categoryId}`)
    }
    delete$(categoryId:number) {
        return this.#httpClient.delete(`${this.#endPoint}/${categoryId}`)
    }

}