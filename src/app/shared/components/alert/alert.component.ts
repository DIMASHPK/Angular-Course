import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector:"app-alert",
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input()message!: string

  @Output('onClose')onClose = new EventEmitter<void>();

  handleClose = () => {
    this.onClose.emit()
  }



}
