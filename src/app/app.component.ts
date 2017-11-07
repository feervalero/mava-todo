import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

interface Task{
  userid:string
  desc:string
  status:string,
  date:Date
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AngularFireAuth]
})
export class AppComponent {
  msgVal:any;
  authStatus:any;
  dateNow = Date.now();
  taskCollection: AngularFirestoreCollection<Task>;
  tasks:Observable<Task[]>;
  constructor (private afs: AngularFirestore,public afAuth: AngularFireAuth){}
  ngOnInit(){
    this.authStatus = 0;
    this.afAuth.auth.onAuthStateChanged(function(user){
      console.log("status",this.authStatus);
      if(user){
        console.log(user,"is conected");
        this.authStatus = (this.authStatus==0)?this.authStatus = 0:this.authStatus=1;
        console.log(this.authStatus);
      }else{
        console.log("is not connected");
        this.authStatus = (this.authStatus==1)?this.authStatus = 0:this.authStatus=1;
        console.log(this.authStatus);
      }
    });
    this.taskCollection = this.afs.collection('tasks', ref => ref.where('userid', '==', '1111').orderBy("date"));    
    this.tasks = this.taskCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Task;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    console.log(this.tasks);
  }
  login(){
    this.afAuth.auth.signInAnonymously().then(x=>console.log(x));
  }
  logout(){
    this.afAuth.auth.signOut().then(x=>console.log(x));
  }
  

  itemUp(event:any){
    //event.className+=" itemUp";
  }
  addTask(){
    if(this.msgVal){
      var new_task = {
        "userid":"1111",
        "desc":this.msgVal,
        "status":"0",
        "date":null
      };
      this.afs.collection('tasks').add(new_task).then(x=>{console.log("updated",x)});
    }
    this.msgVal = "";
    
  }
  deleteTask(task_delete:any){
    this.afs.doc('tasks/'+task_delete.id).delete().then(x=>{console.log(x)});
    
  }
  toogleTaskState(tasktoggle:any){
    console.log((tasktoggle.status == 1)?this.afs.doc("tasks/"+tasktoggle.id).update({"status":"0"}):this.afs.doc("tasks/"+tasktoggle.id).update({"status":"1"}));
  }
  
  drawer_open(){
    var d = document.getElementById("drawer");
    d.className += " drawer-open";

    var d = document.getElementById("drawer-shadow");
    d.className += " shadow-open";
  }
  drawer_close(){
    var e = document.getElementById("drawer");
    e.className = '';

    var es = document.getElementById("drawer-shadow");
    es.className = '';
  }
  task_open(){
    var d = document.getElementById("task-add");
    d.className += " addTask-open";

  }
  task_close(){
    var e = document.getElementById("task-add");
    e.className = '';

  }

  
}
