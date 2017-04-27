import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    "class": "c-app-root",
  },
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Battlemapper';
}
