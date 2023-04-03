import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthServiceService } from '../auth/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { timeInterval } from 'rxjs';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  dataset:any;
  username = ''
  chartActive:boolean = false;
  fetchable:boolean = false;
  mse:any;
  rmse:any;
  mae:any
  url:string = "http://localhost:5000"

  constructor(private sideBarComp:SidebarComponent,
             private snackBar:MatSnackBar,
             private authService:AuthServiceService,
             private http:HttpClient){}

  ngOnInit(): void {
    setTimeout(()=>{
      this.fetchable = true;
    },1000)
  }
  async fetchDataset(endpoint:string){
    const response =  await fetch(`${this.url}/${endpoint}`,{method:'GET'});
    let res = await response.json();
    return res
    // this.labels = this.dataset.labels; //if await was not used.. this would be initialised an undefined value. because the data
    //                                          //have not been fetched yet.
    // this.sales = this.dataset.sales; 
  }

  //Chart.js  
  public chart:any;
  sales:any; 
  labels:any;
  async createChart(){  
    this.dataset =  await this.fetchDataset('predict'); //Waiting till the data is fetched from server
    this.labels = this.dataset.labels
    this.sales = this.dataset.sales
    console.log(this.sales);
    this.chartActive = true;
    this.chart = new Chart("chart", {
      type: 'line', //this denotes tha type of chart
      
      data: {// values on X-Axis : Values on y axis will be automatically adjusted based on the values
        labels:this.labels, 
	       datasets: [  
         
          {
            label: "Sales",
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
  async testSet(){
    this.dataset = await this.fetchDataset('test_set'); //Waiting till the data is fetched from server
    this.labels = this.dataset.labels
    this.sales = this.dataset.predicted
    let actual = this.dataset.actual
    this.mae = this.dataset.mae;
    this.mse = this.dataset.mse;
    this.rmse = this.dataset.rmse;
    console.log(this.mae);
    console.log(this.mse);
    console.log(this.rmse)
    console.log(this.sales);
    this.chartActive = true;
    this.chart = new Chart("chart", {
      type: 'line', //this denotes tha type of chart
      
      data: {// values on X-Axis : Values on y axis will be automatically adjusted based on the values
        labels:this.labels, 
	       datasets: [  
         
          {
            label: "Predicted",
            data: this.sales,
            
            borderColor:'#FFB84C',
            pointBackgroundColor:'black'
          } ,
          {
            label:"Actual",
            data:actual,
            borderColor:'#19A7CE',
            pointBackgroundColor:'black'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
 
   }
destroyChart(){
  this.chart.destroy();
  this.chartActive = false;
}

download(){
  // The file will be returned in the form of blob(binary large object)
  this.http.get(`${this.url}/get_csv`,{responseType:'blob'}).subscribe((res:Blob)=>{
     const fileName = 'output.zip'; 
      const a = document.createElement('a');
      // Making the file downloadable
      const objectUrl = URL.createObjectURL(res);
      // console.log(res);
      // console.log(objectUrl)
      a.href = objectUrl;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(objectUrl);
  })
}
logout(){
  this.sideBarComp.logout()
}
}
