import {Component, inject} from "@angular/core";
import {InputDirective} from "../../../../shared/directives/input.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DailySalesReportDto} from "../../models/reports/repotrs.interface";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {ReportService} from "../../services/report.service";

@Component({
    selector: "app-reports",
    templateUrl:'reports.component.html',
    standalone:true,
    imports: [
        InputDirective,
        ReactiveFormsModule,
        FormsModule,
        DatePipe,
        CurrencyPipe
    ]
})
export default class ReportsComponent {
    #reportService=inject(ReportService)
    dateSearch:string='';

    report!:DailySalesReportDto;

    getReport(){

        if(this.dateSearch)
            this.getReportByDate(this.dateSearch);
        else
            this.getTodayReport()

    }

    getTodayReport(){
        this.#reportService.getTodayReport().subscribe({
            next: value => {
                this.report=value.data;
                console.log(this.report);

            },
            error: err => {
                console.log(err)
            }
        })
    }
    getReportByDate(date:string){
        this.#reportService.getReport(date).subscribe({
            next: value => {
                this.report=value.data;
                console.log(this.report);
            },
            error: err => {
                console.log(err)
            }
        })
    }



    #getOnlyDate(input: string | Date): string {
        const date = new Date(input);
        return date.toISOString().split('T')[0];
    }

}