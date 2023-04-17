import { Component } from '@angular/core';
import { RegisterForm } from 'src/app/types/Auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  form: RegisterForm = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private authService: AuthService) {}

  submit() {
    this.authService.register(this.form);
  }

  isLoading() {
    return this.authService.isLoading;
  }
}
