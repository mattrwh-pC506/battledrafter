import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    "class": "c-app-root",
  },
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Battledrafter';
}
