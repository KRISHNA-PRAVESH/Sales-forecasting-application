import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { delay } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private users:any;
  constructor(private router: Router,private snackBar: MatSnackBar){

  }

  // Displaying the snack bar
  openSnackBarTop(msg:string,action:string,duration:number,panelClass:string){
    this.snackBar.open(msg,action,{duration:duration,verticalPosition:'top',horizontalPosition:'right',panelClass:[panelClass]});
    return;
  }
  openSnackBarBottom(msg:string,action:string,duration:number,panelClass:string){

    this.snackBar.open(msg,action,{duration:duration,verticalPosition:'bottom',horizontalPosition:'right',panelClass:[panelClass]});
  }
  //ngOnInit is a life cycle hook called by Angular to indicate that Angular is done creating the component.
  ngOnInit(): void {
    
    
    //creating a static list of users
    this.users = [
      {
        username:"krishna",
        password:"12345"
      },
      {
        username:"Zayn",
        password:"56789"
      },
      {
        username:"Louis",
        password:"00000"
      }
    ]
  }
  hide = true;
  authenticate(fdata: NgForm){
    // console.log(f.value.username);
    // console.log(f.value.password);
    let isPresent:boolean = false;
    let username:string = fdata.value.username;
    let password:string = fdata.value.password;
    let flag:number = 0;

    //Traversing through the list of users 
    this.users.forEach(((element: { username: string; password: string; })=> {
      //finding if there exist an user with the specified credentials and the password is correct
      if(element.username === username){
        if(element.password === password) isPresent = true;
        else flag = 1;
      }
    }));

    if(isPresent){
      this.openSnackBarTop(`Hi, ${username}`,"ok",1000,"blue-snackbar");
      console.log("here");
    
      //navigating the to the dashboard
      this.router.navigate(['dashboard']); //navigate() accepts an array of type any as its parameters, 
    }

    else if(flag==1){
      this.openSnackBarBottom("Incorrect Password","",1000,"red-snackbar");
    }
    else{
      this.openSnackBarBottom("User Not found","",1000,"red-snackbar");
    }
  }
}
