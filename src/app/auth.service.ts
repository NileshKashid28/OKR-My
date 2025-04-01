
import { Injectable } from "@angular/core"
import { BehaviorSubject, tap,map } from "rxjs"
import { User } from "../models/user.model"
import { HttpClient } from "@angular/common/http"
import { Router } from "@angular/router"


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null)
  public currentUser$ = this.currentUserSubject.asObservable()

  constructor(private http: HttpClient, private router : Router) {
  }

  public getUserDetails() {
    // From auth api call
    const userId = localStorage.getItem("userId");
    if(!userId) { return }
    return this.http.get<User>(`http://localhost:8080/api/users/${userId}`)
    .pipe(
      tap((data)=>{
        console.log('data',data); // later to be removed
        this.currentUserSubject.next(data);
      }), 
      map((d) => d),
    );
  }

  login(username: string, email: string, roles : [any], userId:number,
      groupId:number,
      managerId:number,
      designation: string): boolean {
    const user: User = {
      username ,
      email,
      roles,
      userId,
      groupId,
      managerId,
      designation,
    }
    localStorage.setItem("user",JSON.stringify(user))
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("userName", user.username)
    localStorage.setItem("userEmail", user.email)
    localStorage.setItem("userRole", user.roles[0])

    this.currentUserSubject.next(user);
    return true
  }

  logout(): void {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userRole")

    this.currentUserSubject.next(null)
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('auth-user');
    if(!user){
      return false;
    }
    const parsedUser = JSON.parse(user);
    return parsedUser.token;
  }

  isAdmin(): boolean {
    return localStorage.getItem("userRole") === "OkrAdmin"
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value
  }

  updateUserProfile(userData: Partial<User>): void {
    const currentUser = this.getCurrentUser()
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData }

      localStorage.setItem("userName", updatedUser.username)
      if (updatedUser.email) {
        localStorage.setItem("userEmail", updatedUser.email)
      }

      this.currentUserSubject.next(updatedUser)
    }
  }
}


