import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page implements OnInit, OnDestroy {
  transactions: Transaction[] = [];
  private transactionSubscription?: Subscription;

  constructor(
    private transactionService: TransactionService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.transactionSubscription =
      this.transactionService.transactions$.subscribe(transactions => {
        this.transactions = transactions;
        this.changeDetector.markForCheck();
      });
  }

  ionViewWillEnter(): void {
    this.transactions = this.transactionService.getTransactions();
    this.changeDetector.markForCheck();
  }

  ngOnDestroy(): void {
    this.transactionSubscription?.unsubscribe();
  }
}