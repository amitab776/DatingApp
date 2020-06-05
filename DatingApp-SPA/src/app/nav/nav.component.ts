import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('Login Successful for: ' + this.model.Username);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loggedIn() {
    const userToken = localStorage.getItem('token');
    return !!userToken;
  }

  logOut() {
    localStorage.removeItem('token');
    console.log('LogOut Successful');
  }
}
