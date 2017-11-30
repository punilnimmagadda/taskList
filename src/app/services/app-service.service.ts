import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppServiceService {
  
  subject:Subject<any> = new Subject();
  obj:Subject<any> = new Subject();
  obj$:Observable<any> = this.obj.asObservable();
  index = null;

  watchStorage(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
  
  tasks = JSON.parse(localStorage.getItem("tasks"));

  obTasks = Observable.create(observer => {
    observer.next(this.tasks);
    observer.complete();
  });

  getTasks()
  {
    this.subject.next(this.tasks);
    console.log("from getTasks() return"+this.obTasks);
    return this.subject;
    // console.log("from gettasks"+JSON.stringify(localStorage));
    // return JSON.stringify(localStorage);
  }

  updateTask()
  {
    this.obj.next((JSON.parse(localStorage.getItem("tasks")))[this.index]);
    console.log(this.obj);
  }

}
