import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user.model'; 

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) {}


  getUsersData(): Observable<User[]> { 
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: number): Observable<User> { 
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  
  createUser(user : User ): Observable<Object>{
    return this.http.post(`${this.apiUrl}`, user);
  }
}
