import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiResponseInterface} from "../../../core/Models/api-response.interface";
import {ItemCategoriesInterface} from "../models/item-categories.interface";
import {DailySalesReportDto} from "../models/reports/repotrs.interface";

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    #httpClient = inject(HttpClient);
    #endPoint = 'http://localhost:5286/sale-report'


    getReport(date:string){
        return this.#httpClient.get<ApiResponseInterface<DailySalesReportDto>>(
            `${this.#endPoint}/by-date?date=${date}`);

    }
    getTodayReport(){
        return this.#httpClient.get<ApiResponseInterface<DailySalesReportDto>>(
            `${this.#endPoint}/by-date`);

    }
}