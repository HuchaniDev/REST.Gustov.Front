import {Component, inject} from "@angular/core";
import {DialogService} from "../../../../../shared/controls/dialog";
import {SaleDetailTickedInterface} from "../../../models/sale/sale-detail-ticked.interface";
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'ticked-show',
    templateUrl: 'ticked-show.component.html',
    standalone: true,
    imports: [
        JsonPipe
    ]
})
export class TickedShowComponent {
    #dialogService=inject(DialogService)

    ticked = this.#dialogService.dialogConfig?.data as SaleDetailTickedInterface;
}