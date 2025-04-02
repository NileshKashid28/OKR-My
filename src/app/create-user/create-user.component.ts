import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  imports: [ReactiveFormsModule]
})
export class CreateUserComponent {
  createUserForm: FormGroup;
  searchTerm: string = '';
  filteredManagers: string[] = [];
  selectedManagers: string[] = [];  // Array to hold selected managers

  // Example list of managers
  managers: string[] = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];

  constructor(private fb: FormBuilder) {
    this.createUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', [Validators.required]],
      role: [''],
    });
  }

  updateSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchTerm = searchTerm;

    // Only filter if there is input
    if (searchTerm) {
      this.filteredManagers = this.managers.filter(manager =>
        manager.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredManagers = [];
    }
  }

  toggleManager(manager: string) {
    // Toggle manager selection
    if (this.selectedManagers.includes(manager)) {
      this.removeManager(manager);
    } else {
      this.selectedManagers.push(manager);
    }
    this.searchTerm = ''; // Reset the search term when a manager is selected
    this.filteredManagers = []; // Clear the dropdown list
  }

  removeManager(manager: string) {
    // Remove manager from the selected list
    const index = this.selectedManagers.indexOf(manager);
    if (index !== -1) {
      this.selectedManagers.splice(index, 1);
    }
  }

  onSubmit() {
    // Submit form logic
    console.log(this.createUserForm.value);
  }

  onCancel() {
    // Cancel form logic
    console.log('Form cancelled');
  }
}
