import { Component,ElementRef,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';

// import { ChartConfiguration,ChartOptions, ChartType } from 'chart.js';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
   
  fileName = '';
  val = 'months';
  format: any;
  file:any;
  periodicity:any;
  num:any;
  url:string = "http://localhost:5000"
  formData:any;
 
  
  
 
  constructor(private http:HttpClient,
    private snackBar:MatSnackBar,
    private router:Router,
    private authService:AuthServiceService,
    ){

  }

  ngOnInit(): void {
     
  }
  
 

  isValidForm(){
    if(this.file && this.periodicity && this.num){
      return true;
    }
    else  return false;
  }
 
  dataResponse:any;
  fetch(data:NgForm){
    this.periodicity = data.value.periodicity;
    this.num = data.value.number;
    // Send the post request only if the file exists
    if(this.isValidForm()){
      this.formData = new FormData();
      this.formData.append("File",this.file);
      this.formData.append("periodicity",this.periodicity);
      this.formData.append("num",this.num);
      console.log(this.formData);
     
       // Sending the form data to the flask server running at port 5000 at the endpoint /save
       this.http.post(`${this.url}/save`,this.formData,{responseType:'text'}).subscribe(res =>{
       console.log(res)
    }); 
    }
    else{
      this.snackBar.open("Please fill all the fields","ok",{duration:1000,verticalPosition:'top',horizontalPosition:'center',panelClass:['red-snackbar']})
    }
    
  }

  onFileSelected(f:any){
    this.fileName = f.target.files[0].name;
    // console.log(f.target.files[0]);
    this.file = f.target.files[0];
   
    // Verifying whether the file is csv or not.
    this.format = this.file.name.split('.'); //gives a string array of [filename,extension]
    // console.log(this.format)
    if(this.format[1]!='csv'){
      this.snackBar.open("Please Upload a csv file","ok",{duration:1000,verticalPosition:'top',horizontalPosition:'center',panelClass:['red-snackbar']})
      this.deleteFile();
    }
    
  }
  onPeriodSelected(f:any){
    // console.log(f.explicitOriginalTarget.value);
    this.val = f.explicitOriginalTarget.value;
  }
  
  deleteFile(){
 
    this.format = null;
    this.fileName = '';
    this.file = null;
    // this.fileSelect
    
  }
  

  

  
 
}
