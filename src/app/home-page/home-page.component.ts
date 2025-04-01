import { booleanAttribute, Component , signal, Signal} from '@angular/core';
import { ObjectiveComponent } from '../objective/objective.component';
import { ApprovalsComponent } from '../approvals/approvals.component';
import { MyTeamsComponent } from '../my-teams/my-teams.component';
import { OkrAdminComponent } from '../okr-admin/okr-admin.component';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [ObjectiveComponent,ApprovalsComponent,MyTeamsComponent,OkrAdminComponent, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  //write the code to fetch the name of the user who just logged in...
  
  userRole : string | null = null;
  userName : string | null = null;
  isDropDownVisible = false;
  constructor(private router: Router, private authService : AuthService) {}

title = 'OKRBOUNTEOUS';
  selectedTab = 'progress';
  
ngOnInit(): void {
  const user = this.authService.getUserFromStorage()
  if (user) {
    this.userName = user.fullName; 
    this.userRole = user.roles[0] ; // Fix role access
  }
}

activeTab: any;
  navigateToLogin(): void {
  this.router.navigate(['/home']);
  }
  toggleUserInfoDropdown(): void {
    console.log('toggleUserInfoDropdown');
  this.isDropDownVisible = !this.isDropDownVisible;
}
getUserInitials(): string | null {
  if (this.userName) {
    const names = this.userName.split(" ");
    return names.length >= 2 ? names[0][0] + names[1][0] : names[0][0];
  }
  return null;
}

logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}

