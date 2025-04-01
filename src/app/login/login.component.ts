import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  otpForm: FormGroup;
  isSubmitting = false;
  showPassword = false;
  otpVisible = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
  }

onSubmit() {
  this.errorMessage = '';
  this.successMessage = '';

  if (this.loginForm.valid && !this.otpVisible) {
    this.isSubmitting = true;
    this.authService.sendOtp(this.loginForm.value.email).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.success) {
          this.otpVisible = true;
          this.successMessage = response.message || 'OTP sent to your email. Please verify.';
        } else {
          this.errorMessage = 'Please use an authorized email ID.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Failed to send OTP. Please try again.';
      },
    });
  } else if (this.loginForm.valid && this.otpVisible && this.otpForm.valid) {
    this.isSubmitting = true;
    this.authService.verifyOtp(this.loginForm.value.email, this.otpForm.value.otp).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        console.log("JWT Token Received:", response);
        if (response.token) { // make sures my token exists
          this.successMessage = 'Successfully Authenticated';
          this.authService.isLoggedIn();
          this.router.navigate(['/home']); 
          this.loginForm.reset();
          this.otpForm.reset();
        } else {
          this.errorMessage = 'OTP verification failed. Please try again.';
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Error in Otp Verification. Please try again.';
      },
    });
  }
}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}