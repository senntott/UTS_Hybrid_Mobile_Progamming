import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor() {
    const darkModeEnabled =
      localStorage.getItem('simobile-dark-mode') === 'true';

    document.body.classList.toggle('dark', darkModeEnabled);
  }
}