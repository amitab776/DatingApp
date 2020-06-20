import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyjsService } from '../_services/alertifyjs.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() CancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyjsService) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(
      (success) => {
        this.alertifyService.success('Registration Successful');
      },
      (error) => {
        this.alertifyService.error(error);
      }
    );
  }

  cancel() {
    this.CancelRegister.emit(false);
  }
}