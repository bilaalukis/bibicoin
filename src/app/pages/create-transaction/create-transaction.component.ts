import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/services/blockchain.service';
import { Transaction } from 'blockchain_project/src/blockchain';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss'],
})
export class CreateTransactionComponent implements OnInit {
  public newTx;
  public walletKey;

  constructor(private blockchainService: BlockchainService) {
    this.walletKey = blockchainService.walletKeys[0];
  }

  ngOnInit(): void {
    this.newTx = new Transaction();
  }

  // Create and submit transaction to blockchain
  createTransaction() {
    this.newTx.fromAddress = this.walletKey.publicKey; // Sets the from address for the transaction as my public key
    this.newTx.signTransaction(this.walletKey.keyObj); // Signs the transaction with the generated key pair from blockchain services.

    this.blockchainService.addTransaction(this.newTx); // Once the transaction has been signed, it is added to the blockchain

    this.newTx = new Transaction(); // Resets the new Transaction
  }
}
