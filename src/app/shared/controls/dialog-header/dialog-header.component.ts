import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dialog-header',
  templateUrl: './dialog-header.component.html',
  standalone: true,
  imports: [],
})
export class DialogHeaderComponent {

  @Input() titleHeader: string = '';
  @Output() onClose = new EventEmitter<void>();

  close(){
    this.onClose.emit();
  }
}
