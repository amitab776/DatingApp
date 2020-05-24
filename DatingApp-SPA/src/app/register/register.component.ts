import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() CancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(
      (success) => {
        console.log('Registration Successful');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.CancelRegister.emit(false);
    console.log('Cancelled');
  }
}
