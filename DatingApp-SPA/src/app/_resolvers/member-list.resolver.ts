import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyjsService } from '../_services/alertifyjs.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]>
{
    constructor(private userService: UserService, private alertify: AlertifyjsService, private router: Router){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{
        return this.userService.getUsers().pipe(
            catchError(() => {
                this.alertify.error('Error occurred while retrieving the user detail');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
