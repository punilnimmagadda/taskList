import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../services/app-service.service';
import { TaskDetailsComponent } from '../../components/task-details/task-details.component';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  create:boolean = false;
  obj = {};
  tasks = [];
  newTask = [];
  keys = [];
  constructor(public appService : AppServiceService) { 
    
  }

  ngOnInit() {
    localStorage.clear();

    this.appService.watchStorage().subscribe((data)=>{
      this.tasks = data;
      console.log("from"+this.tasks);
    });
  }

  update(i)
  {
    
    this.appService.index = i;
    this.appService.updateTask();
    
    console.log(this.appService.index);
  }

  createTask()
  {
    this.create = true;
    console.log(this.create);
  }

  addTask(event)
  {
    if(event.keyCode == 13)
    {
      if(localStorage.length==0)
      {
        localStorage.setItem("tasks",JSON.stringify(this.tasks));
      }
      this.newTask = JSON.parse(localStorage.getItem("tasks"));
      let d = new Date()
      let dateCreated = (d.getMonth()+1)+"-"+d.getDate()+"-"+d.getFullYear();
      let timeCreated = d.getHours()+":"+d.getMinutes();
      this.obj["dateCreated"] = dateCreated+" "+timeCreated;
      this.newTask.push(this.obj);
      localStorage.setItem("tasks",JSON.stringify(this.newTask));
      this.appService.subject.next(JSON.parse(localStorage.getItem("tasks")));
      console.log(JSON.parse(localStorage.getItem("tasks")));
      this.obj = {};
      this.create = false;
    }
  }
}