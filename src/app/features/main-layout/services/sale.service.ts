import {inject, Injectable} from "@angular/core";
import {ApiResponseInterface} from "../../../core/Models/api-response.interface";
import {ItemSalesInterface} from "../models/sale/item-sales.interface";
import {SaleDetailTickedInterface} from "../models/sale/sale-detail-ticked.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SaleService {
    #httpClient = inject(HttpClient);
    #endPoint = 'http://localhost:5286/sale';

    saveSale$(items:ItemSalesInterface[]){
        return this.#httpClient.post<ApiResponseInterface<SaleDetailTickedInterface>>(`${this.#endPoint}/`,items);
    }
}