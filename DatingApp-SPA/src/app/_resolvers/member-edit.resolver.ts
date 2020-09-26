import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyjsService } from '../_services/alertifyjs.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>
{
    constructor(
        private userService: UserService,
        private alertify: AlertifyjsService,
        private router: Router,
        private authService: AuthService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(() => {
                this.alertify.error('Error occurred while retrieving the user detail');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
