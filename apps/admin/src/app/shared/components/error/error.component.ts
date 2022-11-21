import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'vrsoftware-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Input() icon?: string;
  @Input() title?: string;
  @Input() message?: string;
  @Input() buttonText?: string;
  @Input() buttonIcon?: string;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter();
}
