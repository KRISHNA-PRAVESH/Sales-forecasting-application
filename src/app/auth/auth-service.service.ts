import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  url:any;
  isLoggedIn:boolean = false;
  response:any;
  constructor(private http:HttpClient,private snackBar:MatSnackBar,private router:Router) { }
  authenticate(fdata:NgForm){
    let username:string = fdata.value.username;
    let password:string = fdata.value.password;

    const user = new FormData();
    user.append('username',username);
    user.append('password',password);

    this.url = "http://localhost:5000/login"
       
      this.http.post(this.url,user,{responseType:'json'}).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoggedIn = true;
          console.log(this.isLoggedIn)
        },
        error:(err)=>{
          // console.log(err.error)
          this.response = err.error;
          if(this.response.statusCode==401){
            this.openSnackBarCenter(this.response.responseMessage,"ok",1000,"red-snackbar")
          }
          else{
            this.openSnackBarCenter(this.response.responseMessage,"ok",1000,"red-snackbar")
          }
        },
        complete:()=>{
          this.openSnackBarTop(`Hi, ${username}`,"",1000,"blue-snackbar");
          this.router.navigate(['dashboard'])
        }
      })
  }

  isAuthenticated(){
    return this.isLoggedIn;
  }

   // Displaying the snack bar
   openSnackBarTop(msg:string,action:string,duration:number,panelClass:string){
    this.snackBar.open(msg,action,{duration:duration,verticalPosition:'top',horizontalPosition:'right',panelClass:[panelClass]});
    return;
  }
  openSnackBarCenter(msg:string,action:string,duration:number,panelClass:string){

    this.snackBar.open(msg,action,{duration:duration,verticalPosition:'top',horizontalPosition:'center',panelClass:[panelClass]});
  }
  
}
