import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyjsService } from '../_services/alertifyjs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  userName: string;
  constructor(
    private authService: AuthService,
    private alertify: AlertifyjsService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Login Successful for: ' + this.model.Username);
        this.userName = this.model.Username;
        localStorage.setItem('userName', this.userName);
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    const userToken = localStorage.getItem('token');
    return !!userToken;
  }

  getUserName(): string {
    return localStorage.getItem('userName');
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.alertify.success('LogOut Successful');
    this.router.navigate(['/home']);
  }
}
