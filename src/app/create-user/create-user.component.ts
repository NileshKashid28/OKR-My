import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-user',
  imports:[ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUserForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      designation: [''],
      manager: [''],
    });
  }

  // Submit Handler
  onSubmit() {
    if (this.createUserForm.valid) {
      console.log('User Created:', this.createUserForm.value);
      alert('User created successfully!');
      this.createUserForm.reset();
    }
  }

  // Cancel Button
  onCancel() {
    alert('Action cancelled!');
    this.createUserForm.reset();
    
  }
}
