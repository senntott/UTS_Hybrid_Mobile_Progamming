import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor() {
    localStorage.setItem('simobile-dark-mode', 'false');
    document.body.classList.remove('dark');
  }
}