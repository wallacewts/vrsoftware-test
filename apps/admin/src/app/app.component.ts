import { Component } from '@angular/core';

@Component({
  selector: 'vrsoftware-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  links = [
    {
      text: 'Cursos',
      path: '/cursos',
    },
    {
      text: 'Alunos',
      path: '/alunos',
    },
  ];
}
