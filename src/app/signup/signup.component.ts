import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  // regex to validate email id
  pattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  url:any;
  response:any;
  constructor(private snackBar:MatSnackBar, private http:HttpClient, private router:Router){

  }
  signup(data:NgForm){
    let email = data.value.mailid;
    let username = data.value.username;
    let password = data.value.password;
    if(this.pattern.test(email)) {
      if(email && username && password){
        const newUser = new FormData();
        newUser.append('email',email);
        newUser.append('username',username);
        newUser.append('password',password);
        // console.log(formData);
        this.url = "http://localhost:5000/signup"
       
          this.http.post(this.url,newUser,{responseType:'json'}).subscribe({
            next:(res)=>{
              console.log(res);
            },
            error:(err)=>{
              // console.log(err.error)
              this.response = err.error;
              this.snackBar.open(this.response.responseMessage,"ok",{duration:1000,verticalPosition:'top',horizontalPosition:'center',panelClass:['red-snackbar']})

            },
            complete:()=>{
              this.snackBar.open("We have signed you up!","ok",{duration:1000,verticalPosition:'top',horizontalPosition:'center',panelClass:['green-snackbar']})
              this.router.navigate(['login'])
            }
          })
      }
      else{
        this.snackBar.open("Please fill all the fields","ok",{duration:1000,verticalPosition:'top',horizontalPosition:'center',panelClass:['red-snackbar']})

      }
    
    }
    else{
      this.snackBar.open("Please Enter a valid email","ok",{duration:1000,verticalPosition:'top',horizontalPosition:'center',panelClass:['red-snackbar']})

    }
    
   
  }
}
