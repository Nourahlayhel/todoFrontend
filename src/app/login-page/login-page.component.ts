import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
@Input()user:User=new User();
  constructor(private http:HttpClient,private route: Router) {
  
  }
  login(){
    
    var email=(<HTMLInputElement>document.getElementById("email")).value;
    console.log(email);
    var password=(<HTMLInputElement>document.getElementById("password")).value;
    this.http.post("https://localhost:7093/api/data/get_user/",{EMAIL_ADDRESS:email})
    .subscribe((data:any)=>
    {

    let i=0;
  
 if(email==""||password=="") alert("please enter your info")
 else{
if(email!=data.email_address)
alert("email does not exist");
else{
if (password==data.password)

{ 
  this.user.USER_ID=data.user_id;
  
console.log(data.url);
this.user.name=data.name;
this.user.email_address=data.email_address;
this.user.url=data.url;
this.route.navigate(["TodoList",this.user.USER_ID]);
}
else {alert("wrong password");
(<HTMLInputElement>document.getElementById("password")).value="";
}

}
 }
    
    });}
    
  ngOnInit(): void {


  }

}
