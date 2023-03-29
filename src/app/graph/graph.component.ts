import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthServiceService } from '../auth/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  dataset:any;
  username = ''
  url:string = "http://localhost:5000"

  constructor(private sideBarComp:SidebarComponent,
             private snackBar:MatSnackBar,
             private authService:AuthServiceService){}

  ngOnInit(): void {
   this.sideBarComp.username = this.authService.getUserName()
  }
  async fetchDataset(){

    const response =  await fetch(`${this.url}/predict`,{method:'GET'});
    this.dataset = await response.json();
    this.labels = this.dataset.labels; //if await was not used.. this would be initialised an undefined value. because the data
                                             //have not been fetched yet.
    this.sales = this.dataset.sales; 
  }

  //Chart.js  
  public chart:any;
  sales:any; 
  labels:any;
  async createChart(){  
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
destroyChart(){
  this.chart.destroy();
}
logout(){
  this.sideBarComp.logout()
}
}
