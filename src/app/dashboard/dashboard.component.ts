import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  ngOnInit(): void {
    
  }
  constructor(private http:HttpClient){

  }
  fileName = '';
  val = 'months';
  file!: File;

  onFileSelected(f:any){
    this.fileName = f.target.files[0].name;
    // console.log(f.target.files[0]);
    this.file = f.target.files[0];
    
  }
  onPeriodSelected(f:any){
    // console.log(f.explicitOriginalTarget.value);
    this.val = f.explicitOriginalTarget.value;
  }
  fetch(data:NgForm){

    const formData = new FormData();
    formData.append("File",this.file);
    formData.append("name",data.value.periodicity);
    formData.append("age",data.value.number);
    console.log(formData);

    // Sending the form data to the flask server running at port 5000 at the endpoint /save
    this.http.post("http://localhost:5000/save",formData,{responseType:'text'}).subscribe(res =>{
      console.log(res)
    }); 
  }
  

}
