import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public appService : AppServiceService) { }

  ngOnInit() {
  }

}
