import { Injectable } from '@angular/core';
import { Blockchain } from 'blockchain_project/src/blockchain';
import EC from 'elliptic';

@Injectable({
  providedIn: 'root',
})
export class BlockchainService {
  public blockchainInstance = new Blockchain();
  public walletKeys = [];

  constructor() {
    this.blockchainInstance.difficulty = 4;
    this.blockchainInstance.minePendingTransactions('my-wallet');
    this.generateWalletKeys();
  }

  getBlocks() {
    return this.blockchainInstance.chain;
  }

  addTransaction(tx) {
    this.blockchainInstance.addTransaction(tx);
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey
    );
  }

  private generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    });
  }
}
