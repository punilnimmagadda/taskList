import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  tasks = [];
  newTask = [];
  obj = {};
  
  constructor(public appService : AppServiceService) { }

  ngOnInit() {
    this.appService.obj$.subscribe((data) => {this.obj = data});
   }

  delete()
  {
    this.newTask = JSON.parse(localStorage.getItem("tasks"));
    this.newTask.splice(this.appService.index,1);
    localStorage.setItem("tasks",JSON.stringify(this.newTask));
    this.appService.subject.next(JSON.parse(localStorage.getItem("tasks")));
    this.obj = {};
    this.appService.showDetails = false;
  }

  cancel()
  {
    this.obj = {};
    this.appService.showDetails = false;
  }

  update(event)
  {
    if(event.keyCode == 13)
    {
      this.newTask = JSON.parse(localStorage.getItem("tasks"));
      let d = new Date()
      let dateModified = (d.getMonth()+1)+"-"+d.getDate()+"-"+d.getFullYear();
      let timeModified = d.getHours()+":"+d.getMinutes();
      this.obj["dateModified"] = dateModified+" "+timeModified;
      this.newTask[this.appService.index] = this.obj;
      localStorage.setItem("tasks",JSON.stringify(this.newTask));
      this.appService.subject.next(JSON.parse(localStorage.getItem("tasks")));
      this.obj = {};
      this.appService.showDetails = false;
    }
    
  }
}