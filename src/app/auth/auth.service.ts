import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { LoginForm, RegisterForm } from '../types/Auth';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  isLoading: boolean = false;

  passwordMatched: boolean = true;

  constructor(private router: Router) {}

  login(form: LoginForm) {
    if (this.isLoading) return;

    this.isLoading = true;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((useCredentials) => {
        this.isAuthenticated = true;
        this.router.navigate(['']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Credentials does not match our Record.');
        this.isAuthenticated = false;
      })
      .finally(() => (this.isLoading = false));
  }

  register(form: RegisterForm) {
    if (
      form.password !== form.confirmPassword ||
      form.password === '' ||
      form.confirmPassword === ''
    ) {
      this.passwordMatched = false;
    }
    if (this.isLoading) return;
    this.isLoading = true;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        this.isAuthenticated = true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        this.isAuthenticated = false;
      })
      .finally(() => (this.isLoading = false));
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
