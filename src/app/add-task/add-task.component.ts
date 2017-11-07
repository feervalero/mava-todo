import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  closeAddTask(){
    var e = document.getElementById("task-add");
    e.className = '';
  }

}
