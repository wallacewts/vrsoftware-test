import { Component, Input } from '@angular/core';

@Component({
  selector: 'vrsoftware-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  @Input() icon: string;
  @Input() title: string;
}
