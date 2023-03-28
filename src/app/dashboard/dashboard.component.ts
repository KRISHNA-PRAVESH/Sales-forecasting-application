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
  dataset:any;
  
 
  constructor(private http:HttpClient,
    private snackBar:MatSnackBar,
    private router:Router,
    private authService:AuthServiceService,
    ){

  }

  ngOnInit(): void {
     

  }
  
  async fetchDataset(){

    const response =  await fetch(`${this.url}/predict`,{method:'GET'});
    this.dataset = await response.json();
    this.labels = this.dataset.labels; //if await was not used.. this would be initialised an undefined value. because the data
                                             //have not been fetched yet.
    this.sales = this.dataset.sales; 
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
  logout(){
    this.http.get(`${this.url}/logout`).subscribe()
    this.snackBar.open("Logged Out","ok",{duration:1000,verticalPosition:'top',horizontalPosition:'right',panelClass:['red-snackbar']})
    this.authService.isLoggedIn = false;
    this.formData = null;
    this.router.navigate(['login'])
  }
  

  //Chart.js  
  public chart:any;
  sales:any; 
  labels:any;
  async createChart(){
    if(this.isValidForm()){
    await this.fetchDataset(); //Waiting till the data is fetched from server
    console.log(this.labels)
    console.log(this.sales);
    this.chart = new Chart("chart", {
      type: 'line', //this denotes tha type of chart
      
      data: {// values on X-Axis : Values on y axis will be automatically adjusted based on the values
        labels:this.labels, 
	       datasets: [  
         
          {
            label: "Profit",
            data: this.sales,
            borderColor:'green',
            pointBackgroundColor:'black'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
  else{
    this.snackBar.open("Please fill all the fields","ok",{duration:1000,verticalPosition:'top',horizontalPosition:'center',panelClass:['red-snackbar']})

  }
}

  
 
}
