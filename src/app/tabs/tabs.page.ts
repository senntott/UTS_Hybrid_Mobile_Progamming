import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false
})
export class TabsPage {
  logout(): void {
    window.alert(
      'Fitur logout belum terhubung karena aplikasi SIMOBILE belum menggunakan sistem login.'
    );
  }
}