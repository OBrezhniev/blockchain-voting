import { Component } from '@angular/core';
import { ApiGatewayService } from './services/api-gateway.service';
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  choiseThird = "Yes";
  choiseSecond = "Yes";
  choiseFirst = "No";

  disabledThird = false;
  disabledSecond = false;
  disabledFirst = false;
  YES = 0;
  NO = 0;
  PubKey = "dsfdsgfsdgret45iu6y4368945645645";
  TotalEnc = "32543654364364564565736t4";
  TotalDec = "dsfdsfdsfdsgdkjglkfdlkmgflkmgf";
  transactions = [];
  constructor(private http: ApiGatewayService) {
    this.transactions.push("33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443");
    this.transactions.push("33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443");
    this.transactions.push("33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443");
    this.transactions.push("33341316313628840647027179713816352344878836328912058085039972454094325080493939919136728368164937382659440100474506450461657478329264374260134840662419045443");

  }
  voteFirst() {
    this.disabledFirst = true;
    debugger;
    let choise = this.choiseFirst === "YES" ? 1000 : 1;
    this.http.get("http://localhost:8080/encrypt?message=" + choise).subscribe((encVote) => {
      debugger;
      this.http.post("http://localhost:3000/sendtx", { data: encVote }).subscribe((txId) => {
        this.transactions.push(txId);
      });
    });
  }
  voteSecond() {
    this.disabledSecond = true;
    this.http.post("localhost:8080/vote", { option: this.choiseSecond === "YES" ? 1000 : 1 }).subscribe((encVote) => {
      this.http.post("http://localhost:3000/sendtx", { data: encVote }).subscribe((txId) => {
        this.transactions.push(txId);
      });
    });
  }
  voteThird() {
    this.disabledThird = true;
    this.http.post("http://localhost:8080/vote", { option: this.choiseThird === "YES" ? 1000 : 1 }).subscribe((encVote) => {
      this.http.post("http://localhost:3000/sendtx", { data: encVote }).subscribe((txId) => {
        this.transactions.push(txId);
      });
    });
  }
  decrypt() {
    //get all encrypted
   // this.http.get("http://localhost:3000/all", {}).subscribe((data) => {


      console.log("encrypted votes recieved");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };



      this.http.post("http://localhost:8080/decryptAll", JSON.stringify(this.transactions)).subscribe((res) => {
        this.TotalDec = res;
      });
    //})

  }
}
