import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyjsService } from '../_services/alertifyjs.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private alertify: AlertifyjsService, private router: Router){}
  canActivate(): boolean {
    if (this.authService.loggedIn()){
      return true;
    }
    else{
      this.alertify.error('You shall not pass!!!');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
