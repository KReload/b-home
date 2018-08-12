import { Component } from '@angular/core';
import * as Colyseus from 'colyseus.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    this.room = this.client.join("chat");
  }
  
  room;
  client = new Colyseus.Client("ws://localhost:2657");
  
  title = 'app';
}
