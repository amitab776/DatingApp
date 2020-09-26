import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_model/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyjsService } from 'src/app/_services/alertifyjs.service';
import { viewClassName } from '@angular/compiler';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if (this.editForm.dirty){
      console.log($event);
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertifyjsService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  UpdateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
    .subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
}
