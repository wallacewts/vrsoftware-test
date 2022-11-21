import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vrsoftware-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  @Input() icon: string;
  @Input() actionIcon: string;
  @Input() title: string;
  @Output() saveItem = new EventEmitter();

  handleClick() {
    this.saveItem.emit();
  }
}
