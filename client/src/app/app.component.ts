import { Component } from '@angular/core';
import { ApiGatewayService } from './services/api-gateway.service';
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  keysSecond: any;
  keysThird: any;
  title = 'app';
  choiseThird = "Yes";
  choiseSecond = "Yes";
  choiseFirst = "No";

  disabledThird = false;
  disabledSecond = false;
  disabledFirst = false;
  YES = 0;
  NO = 0;
  PubKey = "";
  TotalEnc = "";
  TotalDec = "";


  shareFirst = 45;
  shareSecond = 35;
  shareThird = 20;

  transactions = [];

  keysFirst = [];
  constructor(private http: ApiGatewayService) {
    this.transactions.push("33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443");
    this.transactions.push("33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443");
    this.transactions.push("33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443");
    this.transactions.push("33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443");
    this.getPubkey();
  }

  getPubkey() {
    this.http.get("http://localhost:8080/generatePrivateKeys").subscribe((res) => {
    this.PubKey = res;
    });
  }
  getVotesPerHolder(){
    this.http.get("http://localhost:3000/api/votes").subscribe((res)=>{
        this.keysFirst = [];
        this.keysSecond = [];
        this.keysThird = [];
        
    })
  }
  voteFirst() {
    this.disabledFirst = true;
    let choise = this.choiseFirst === "Yes" ? 1000 : 1;
    this.transactions = [];

    for (let i = 0; i < this.shareFirst; i++) {
      let key = this.keysFirst[i];
      this.http.get("http://localhost:8080/encrypt?message=" + choise).subscribe((encVote) => {
        this.http.post("http://localhost:3000/sendtx", { data: encVote, pubKey: key }).subscribe((txId) => {
          this.transactions.push(txId);
        });
      });
    }

  }
  voteSecond() {
    this.disabledSecond = true;
    let choise = this.choiseSecond === "Yes" ? 1000 : 1;
    this.transactions = [];

    for (let i = 0; i < this.shareSecond; i++) {
      let key = this.keysSecond[i];
      this.http.get("http://localhost:8080/encrypt?message=" + choise).subscribe((encVote) => {
        debugger;
        this.http.post("http://localhost:3000/sendtx", { data: encVote, pubKey: key }).subscribe((txId) => {
          this.transactions.push(txId);
        });
      });
    }
  }
  voteThird() {
    this.disabledThird = true;
    let choise = this.choiseThird === "Yes" ? 1000 : 1;
    this.transactions = [];

    for (let i = 0; i < this.shareThird; i++) {
      let key = this.keysThird[i];
      this.http.get("http://localhost:8080/encrypt?message=" + choise).subscribe((encVote) => {
        this.http.post("http://localhost:3000/sendtx", { data: encVote, pubKey: key }).subscribe((txId) => {
          this.transactions.push(txId);
        });
      });
    }
  }
  decrypt() {
    //get all encrypted
    // this.http.get("http://localhost:3000/all", {}).subscribe((data) => {


    console.log("encrypted votes recieved");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };



    this.http.post("http://localhost:8080/decryptAll", JSON.stringify(this.transactions)).subscribe((res) => {
      this.TotalDec = res;
    });
    //})

  }
}
