import { Component } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ionViewWillEnter(): void {
    this.transactions = this.transactionService.getTransactions();
  }
}