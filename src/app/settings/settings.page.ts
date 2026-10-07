import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  darkMode = false;

  ngOnInit(): void {
    this.darkMode = localStorage.getItem('simobile-dark-mode') === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  changeTheme(event: any): void {
    this.darkMode = event.detail.checked;

    document.body.classList.toggle('dark', this.darkMode);
    localStorage.setItem('simobile-dark-mode', String(this.darkMode));
  }
}