import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private users:any;
  isLoggedIn:boolean = false;
  url:any;
  response:any;
  hide:boolean = true;
  constructor(private router: Router,private snackBar: MatSnackBar, private http:HttpClient, private authService:AuthServiceService){

  }

  // Displaying the snack bar
  openSnackBarTop(msg:string,action:string,duration:number,panelClass:string){
    this.snackBar.open(msg,action,{duration:duration,verticalPosition:'top',horizontalPosition:'right',panelClass:[panelClass]});
    return;
  }
  openSnackBarCenter(msg:string,action:string,duration:number,panelClass:string){

    this.snackBar.open(msg,action,{duration:duration,verticalPosition:'top',horizontalPosition:'center',panelClass:[panelClass]});
  }
  //ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the component.
  ngOnInit(): void {
    
  }
  
  authenticate(fdata: NgForm){
     this.authService.authenticate(fdata);
   
}
}
