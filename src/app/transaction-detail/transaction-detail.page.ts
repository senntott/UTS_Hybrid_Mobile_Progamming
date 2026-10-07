import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
  standalone: false
})
export class TransactionDetailPage implements OnInit {
  transaction?: Transaction;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.transaction = this.transactionService.getTransactionById(id);
    });
  }
}