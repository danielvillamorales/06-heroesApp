import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private authServices : AuthServiceService,
    private router: Router
    ){}

  onLogin(){
    this.authServices.login('danielvillamorales@gmail.com', '123456')
    .subscribe( user => {
      this.router.navigate(['./heroes']);
    });
  }

}
