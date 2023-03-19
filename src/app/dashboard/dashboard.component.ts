import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  ngOnInit(): void {
    
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
    formData.append("Period",data.value.periodicity);
    formData.append("number",data.value.number);
    console.log(formData);
    
  }
  

}
