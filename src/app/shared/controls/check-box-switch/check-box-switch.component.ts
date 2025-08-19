import {Component, input, output} from "@angular/core";

@Component({
    selector: 'check-box-switch',
    templateUrl: 'check-box-switch.component.html',
    standalone: true,
    imports: [],
})
export class SwitchButtonComponent {
    checked = input<boolean>(false);
    checkChange = output<boolean>();

    active(event:Event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        event.preventDefault();
        this.checkChange.emit(!this.checked());
    }

}
