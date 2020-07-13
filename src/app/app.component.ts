import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit(): void {

    const firebaseConfig = {
      // configurações do projeto do Firebase
    };

    firebase.initializeApp(firebaseConfig);
  }
  
  title = 'app3';
}
