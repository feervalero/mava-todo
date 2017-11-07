import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
var config = {
  apiKey: "AIzaSyCnqf21lEs016MyQiZ-MwHT4BvtSRXvQAo",
  authDomain: "mava-todo.firebaseapp.com",
  databaseURL: "https://mava-todo.firebaseio.com",
  projectId: "mava-todo",
  storageBucket: "mava-todo.appspot.com",
  messagingSenderId: "332300973200"
};


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
