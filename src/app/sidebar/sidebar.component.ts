import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../auth/auth-service.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  username = ''
  url:string = "http://localhost:5000"
  
  constructor(private http:HttpClient,
              private snackBar:MatSnackBar,
              private authService:AuthServiceService,
              private router:Router

  ){}

  ngOnInit(): void {
    this.username = this.authService.getUserName()
  }

  logout(){
    this.http.get(`${this.url}/logout`).subscribe()
    this.snackBar.open("Logged Out","ok",{duration:1000,verticalPosition:'top',horizontalPosition:'right',panelClass:['red-snackbar']})
    this.authService.isLoggedIn = false;
    this.router.navigate(['login'])
  }
}
