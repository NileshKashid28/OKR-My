import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { User } from '../user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
    id: number = 0;
    user: User = {} as User;  // Initialize user
    error: string = '';  // For error handling

    constructor(private route: ActivatedRoute, private httpService: HttpService) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.httpService.getUserById(this.id).subscribe(
            (data: any) => {  // Use 'any' temporarily to bypass strict typing
                this.user = new User(
                    data.userId,
                    data.username,
                    data.designation,
                    data.managerId,
                    data.email,
                    data.groupId // Optional
                );
            },
            (error: HttpErrorResponse) => {
                this.error = `Error fetching user details: ${error.message || error.statusText}`;
                console.error('Error fetching user:', error);
            }
        );
    }
    editUser() {
        console.log('Edit button clicked');
        // Add logic to navigate to edit user page or open a modal
      }
    
      deleteUser() {
        console.log('Delete button clicked');
        // Add logic to delete user
      }
}
