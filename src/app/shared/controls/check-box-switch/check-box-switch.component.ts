import {Component, Input, input, output} from "@angular/core";

@Component({
    selector: 'check-box-switch',
    templateUrl: 'check-box-switch.component.html',
    standalone: true,
    imports: [],
})
export class SwitchButtonComponent {
    @Input() checked: boolean = false;
    checkedChange  = output<boolean>();

    toggle(){
        this.checked = !this.checked;
        this.checkedChange .emit(this.checked);
    }
}
