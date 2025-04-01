import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>; //later change to user type

  constructor(private http: HttpClient, private router : Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      this.getUserFromStorage()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string): Observable<any> {
    return this.http
      .post(
        AUTH_API + 'login',
        {
          email
        },
        httpOptions
      )
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            localStorage.setItem('auth-user', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
          return response;
        })
      );
  }
  sendOtp(email: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'send-otp',
      {
        email
      },
      httpOptions
    );
  }

verifyOtp(email: string, otp: string): Observable<any> {
  return this.http.post(AUTH_API + 'verify-otp', { email, otp }, httpOptions)
    .pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('auth-user', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
      })
    );
}


  logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); 
  }

  public getUserFromStorage(): any {
    const user = localStorage.getItem('auth-user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('auth-user');
    if(!user){
      return false;
    }
    const parsedUser = JSON.parse(user);
    console.log(parsedUser);
    return parsedUser.token;
  }
}

 