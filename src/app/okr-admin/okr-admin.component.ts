import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service'; // Assuming HttpService is properly created
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-okr-admin',
  templateUrl: './okr-admin.component.html',
  styleUrls: ['./okr-admin.component.scss'],
  providers: [HttpService],
  imports: [CommonModule,FormsModule],
})
export class OkrAdminComponent implements OnInit {
  data: any = [];
  showCreateUser: boolean = false;
  isLoading: boolean = true;
  searchQuery: string = ''; // Search query variable
  newUser: any = {
    username: '',
    email: '',
    designation: '',
    manager: '',
  };

  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    this.httpService.getUsersData().subscribe(
      (response) => {
        this.data = response;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }

  // Navigate to create user form page
  createUser() {
    this.router.navigate(['/createuser']);
  }

  createTeam() {
    this.router.navigate(['/createteam']);
  }

  viewTeam() {
    this.router.navigate(['/viewteam']);
  }

  // Get filtered users based on search
  get filteredUsers() {
    if (!this.searchQuery) {
      return this.data;
    }
    return this.data.filter((user: any) =>
      user.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.designation.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Toggle Show/Hide Create User Form
  toggleCreateUserForm() {
    this.showCreateUser = !this.showCreateUser;
  }

  // Create new user logic
  createNewUser() {
    console.log('Creating new user:', this.newUser);
    this.httpService.createUser(this.newUser).subscribe(
      (response) => {
        console.log('User created:', response);
        this.fetchData();
        this.showCreateUser = false; // Hide the form
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  // Cancel and hide Create User Form
  cancelCreateUser() {
    this.showCreateUser = false; // Hide the form
  }

  updateUser(id: number) {
    console.log('Update employee called ' + id);
  }

  deleteUser(id: number) {
    console.log('Deleted user successfully');
  }

  viewUser(id: number) {
    console.log('View user');
    this.router.navigate(['user-details', id]);
  }
}
