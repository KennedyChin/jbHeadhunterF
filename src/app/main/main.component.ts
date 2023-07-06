
import { Component, OnInit } from '@angular/core';

// import { appInputFocusWithFormGroup} from '../share/inputFocusWithLabel'
import { JobServiceService } from '../services/job-service.service';
import { JobHttp } from '../share/Model/JobHttpDto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  regions:string[]=[];
  toDoActionJobs:JobHttp[] = []
  message:string = "";

  constructor(private jobService:JobServiceService) {}

  ngOnInit(): void {
    
  }
}
