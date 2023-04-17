import { Component } from '@angular/core';
import { RegisterForm } from 'src/app/types/Auth';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

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
  passwordMatched: boolean = true;
  isLoading: boolean = false;

  submit() {
    if (
      this.form.password !== this.form.confirmPassword ||
      this.form.password === '' ||
      this.form.confirmPassword === ''
    ) {
      this.passwordMatched = false;
    }
    if (this.isLoading) return;
    this.isLoading = true;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
      })
      .finally(() => (this.isLoading = false));
  }
}
