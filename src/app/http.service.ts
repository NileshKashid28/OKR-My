import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';  // Import the User interface

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  deleteUserById(id: number) {
      throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // Method to fetch data from API
  getUsersData(): Observable<User[]> {  // Return a list of User objects
    console.log("Service class method called for getting users details ....");
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: number): Observable<User> {  // Return a single User object
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  
  createUser(user : User ): Observable<Object>{
    return this.http.post(`${this.apiUrl}`, user);
  }
}
