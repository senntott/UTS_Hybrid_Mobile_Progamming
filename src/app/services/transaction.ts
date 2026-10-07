import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly storageKey = 'simobile-transactions';

  private readonly transactionsSubject =
    new BehaviorSubject<Transaction[]>([]);

  readonly transactions$ = this.transactionsSubject.asObservable();

  constructor() {
    this.transactionsSubject.next(this.getTransactions());
  }

  getTransactions(): Transaction[] {
    return this.loadTransactions()
      .map(transaction => ({
        ...transaction,
        items: transaction.items.map(item => ({ ...item }))
      }))
      .sort(
        (first, second) =>
          new Date(second.date).getTime() - new Date(first.date).getTime()
      );
  }

  getTransactionById(id: number): Transaction | undefined {
    const transaction = this.loadTransactions().find(item => item.id === id);

    if (!transaction) {
      return undefined;
    }

    return {
      ...transaction,
      items: transaction.items.map(item => ({ ...item }))
    };
  }

  addTransaction(
    transaction: Omit<Transaction, 'id'>
  ): Transaction {
    const transactions = this.loadTransactions();
    const nextId = transactions.length > 0
      ? Math.max(...transactions.map(item => item.id)) + 1
      : 1;

    const newTransaction: Transaction = {
      ...transaction,
      id: nextId,
      items: transaction.items.map(item => ({ ...item }))
    };

    transactions.push(newTransaction);
    this.saveTransactions(transactions);

    return newTransaction;
  }

  getTransactionsToday(): Transaction[] {
    return this.loadTransactions().filter(transaction =>
      this.isToday(transaction.date)
    );
  }

  getTotalTransactionsToday(): number {
    return this.getTransactionsToday().length;
  }

  getBestSellingProductToday(): string {
    const quantities = new Map<string, number>();

    for (const transaction of this.getTransactionsToday()) {
      for (const item of transaction.items) {
        quantities.set(
          item.name,
          (quantities.get(item.name) ?? 0) + item.qty
        );
      }
    }

    let bestProduct = '';
    let highestQuantity = 0;

    for (const [name, quantity] of quantities) {
      if (quantity > highestQuantity) {
        bestProduct = name;
        highestQuantity = quantity;
      }
    }

    return bestProduct || 'Belum ada transaksi';
  }

  private isToday(dateValue: string): boolean {
    const transactionDate = new Date(dateValue);

    if (Number.isNaN(transactionDate.getTime())) {
      return false;
    }

    const today = new Date();

    return transactionDate.getFullYear() === today.getFullYear()
      && transactionDate.getMonth() === today.getMonth()
      && transactionDate.getDate() === today.getDate();
  }

  private loadTransactions(): Transaction[] {
    const savedTransactions = localStorage.getItem(this.storageKey);

    if (!savedTransactions) {
      return [];
    }

    try {
      const parsedTransactions: unknown = JSON.parse(savedTransactions);

      return Array.isArray(parsedTransactions)
        ? parsedTransactions as Transaction[]
        : [];
    } catch {
      return [];
    }
  }

  private saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(transactions));
    this.transactionsSubject.next(this.getTransactions());
  }
}