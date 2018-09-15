import { Component } from '@angular/core';
import { ApiGatewayService } from './services/api-gateway.service';

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
    this.transactions.push("afdsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgfasdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");
    this.transactions.push("afa2dsfdsfdsfdsgdkjglkfdlkmgflkmgfdsfdsfdsfdsgdkjglkfdlkmgflkmgf4sdf");

    this.transactions.push("af11dsfdsfdsfdsgdkjglkfdlkmgflkmgfasdf");

  }
  voteFirst() {
    this.disabledFirst = true;
    this.http.post("http://localhost:3000/vote", { option: this.choiseFirst === "YES" ? 1000 : 1 }).subscribe((encVote) => {
      this.http.post("http://localhost:3000/sendtx", { data: encVote }).subscribe((txId) => {
        this.transactions.push(txId);
      });
    });
  }
  voteSecond() {
    this.disabledSecond = true;
    this.http.post("localhost:80/vote", { option: this.choiseSecond === "YES" ? 1000 : 1 }).subscribe((encVote) => {
      this.http.post("http://localhost:3000/sendtx", { data: encVote }).subscribe((txId) => {
        this.transactions.push(txId);
      });
    });
  }
  voteThird() {
    this.disabledThird = true;
    this.http.post("http://localhost:80/vote", { option: this.choiseThird === "YES" ? 1000 : 1 }).subscribe((encVote) => {
      this.http.post("http://localhost:3000/sendtx", { data: encVote }).subscribe((txId) => {
        this.transactions.push(txId);
      });
    });
  }
  decrypt() {
    //get all encrypted 
    this.http.get("http://localhost:3000/all", {}).subscribe((data) => {
      console.log("encrypted votes recieved");
      this.http.post("http://localhost:80/decrypt", data).subscribe((res) => {
        this.TotalDec = res;
      });
    })

  }
}
