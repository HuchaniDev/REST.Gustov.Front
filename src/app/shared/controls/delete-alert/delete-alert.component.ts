import { Component, inject } from "@angular/core";
import { DialogService } from "../dialog";
import {ButtonDirective} from "../../directives/button.directive";
import {DefaultButtonDirective} from "../../directives/default-button.directive";

@Component({
    selector: 'app-delete-alert',
    templateUrl: './delete-alert.component.html',
    imports: [
        ButtonDirective,
        DefaultButtonDirective
    ],
    standalone: true
})
export class DeleteAlertComponent {
  #dialogService = inject(DialogService);

  title:string = this.#dialogService.dialogConfig?.data?.title || 'Estas seguro?';
  message:string =this.#dialogService.dialogConfig?.data.message|| 'Se borrará de forma permanente';
 
  close(value:boolean){
    this.#dialogService.close(value);
  }
}