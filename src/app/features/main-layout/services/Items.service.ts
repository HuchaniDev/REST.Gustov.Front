import {inject, Injectable} from "@angular/core";
import {ApiResponseInterface} from "../../../core/Models/api-response.interface";
import {ItemCategoriesInterface} from "../models/item-categories.interface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ItemInterface} from "../models/items/item.interface";

@Injectable({
  providedIn: 'root'
})
export class ItemsService{
  #httpClient = inject(HttpClient);
  #endPoint = 'http://localhost:5286/item'

  getItemsFilter$(search:string|null = null, categoryId:number=0, status:boolean=true){
    search=this.cleanString(search);
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
  getItemsAll$(){
    return this.#httpClient.get<ApiResponseInterface<ItemCategoriesInterface[]>>(
        `${this.#endPoint}/all`);
  }

  save$(item:ItemInterface){
    return this.#httpClient.post<ApiResponseInterface<object>>(`${this.#endPoint}`, item);
  }

  getById$(itemId:number){
    return this.#httpClient.get<ApiResponseInterface<ItemInterface>>(`${this.#endPoint}/by-id/${itemId}`);
  }

  changeStatus$(itemId:number, status:boolean){
    return this.#httpClient.post<ApiResponseInterface<object>>(`${this.#endPoint}/update-status/${itemId}?status=${status}`,{});
  }

  deleteItem$(itemId:number){
    return this.#httpClient.delete<ApiResponseInterface<object>>(`${this.#endPoint}/${itemId}`);
  }


  cleanString(value: string | null): string | null {
    if (!value) return null; // si ya viene null o vacío

    const trimmed = value.trim(); // elimina espacios al inicio y al final

    return trimmed === '' ? null : trimmed; // si queda vacío => null, si no => cadena limpia
  }

}
