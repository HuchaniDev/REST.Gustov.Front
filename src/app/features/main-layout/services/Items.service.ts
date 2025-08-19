import {inject, Injectable} from "@angular/core";
import {ApiResponseInterface} from "../../../core/Models/api-response.interface";
import {ItemCategoriesInterface} from "../models/item-categories.interface";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemsService{
  #httpClient = inject(HttpClient);
  #endPoint = 'http://localhost:5286/item'

  getItemsFilter(search:string|null = null, categoryId:number=0, status:number=0){
    let params = new HttpParams();
    if (search) {
      params = params.set('searchTerm', search);
    }
    if (categoryId) {
      params = params.set('category', categoryId.toString());
    }
    if (status) {
      params = params.set('status', status.toString());
    }

    return this.#httpClient.get<ApiResponseInterface<ItemCategoriesInterface[]>>(
        `${this.#endPoint}/all-filter`,
        { params }
    );
  }
}
