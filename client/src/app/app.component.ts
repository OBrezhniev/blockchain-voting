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
  choiseThird = 0;
  choiseSecond = 0;
  choiseFirst = 0;

  disabledThird = false;
  disabledSecond = false;
  disabledFirst = false;
  YES = 0;
  NO = 0;
  PubKey = "";
  TotalEnc = "";
  TotalDec = 0;
  TotalYes = 0;
  TotalNo = 0;

  TRUEencryptions = [];
  shareFirst = 45;
  shareSecond = 35;
  shareThird = 20;

  transactions = [];

  keysFirst = [];

  decriptying = false;

  constructor(private http: ApiGatewayService) {

    this.getAllAddresses();

  }

  getPubkey() {
    this.http.get("http://localhost:8080/generatePrivateKeys").subscribe((res) => {
    this.PubKey = res.pubKey;
    });
  }
  getVotesPerHolder(){
    this.http.get("http://localhost:3000/api/getallvotes").subscribe((res)=>{
       console.log(res);

    })
  }
  getAllAddresses(){
    this.http.get("http://localhost:3000/api/voters").subscribe((res)=>{
      this.keysFirst = res.slice(0,45);
      this.keysSecond =  res.slice(45,80);
      this.keysThird = res.slice(80,100);

  })
  }
  voteFirst() {
    this.disabledFirst = true;
    let choise = this.choiseFirst === 1 ? 1000 : 1;
    this.transactions = [];
    for (let i = 0; i < this.shareFirst; i++) {
      let key = this.keysFirst[i];
      this.http.get("http://localhost:8080/encrypt?message=" + choise).subscribe((encVote) => {
        // let encVote = "33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443";
        this.http.post("http://localhost:3000/api/vote", { ballot: encVote, address: key }).subscribe((txId) => {
          this.transactions.push(encVote);
        });
      });
    }

  }
  voteSecond() {
    this.disabledSecond = true;
    let choise = this.choiseSecond === 1 ? 1000 : 1;
    this.transactions = [];

    for (let i = 0; i < this.shareSecond; i++) {
      let key = this.keysSecond[i];
      let encVote = "33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443";

      this.http.get("http://localhost:8080/encrypt?message=" + choise).subscribe((encVote) => {
        this.http.post("http://localhost:3000/api/vote", { ballot: encVote, address: key }).subscribe((txId) => {
          this.transactions.push(encVote);
        });
      });
    }
  }
  voteThird() {
    this.disabledThird = true;
    let choise = this.choiseThird === 1 ? 1000 : 1;
    this.transactions = [];

    for (let i = 0; i < this.shareThird; i++) {
      let key = this.keysThird[i];
      let encVote = "33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443";

      this.http.get("http://localhost:8080/encrypt?message=" + choise).subscribe((encVote) => {
        this.http.post("http://localhost:3000/api/vote", { ballot: encVote, address: key }).subscribe((txId) => {
          this.transactions.push(encVote);
        });
      });
    }
  }
  decrypt() {

    this.decriptying = true;

    console.log("encrypted votes recieved");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    this.http.get("http://localhost:3000/api/getallvotes").subscribe((res)=> {
      console.log(res);
      this.TRUEencryptions =   res;
      this.http.post("http://localhost:8080/decryptAll", JSON.stringify(this.TRUEencryptions)).subscribe((res) => {
        this.TotalDec = parseInt(res.value, 10);
        this.TotalNo = parseInt(res.value.substring(res.value.length-3,res.value.length), 10);
        this.TotalYes = (this.TotalDec-this.TotalNo)/1000;

        this.decriptying=false;
      });
    });


  }
}
