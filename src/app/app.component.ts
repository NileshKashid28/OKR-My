import { Component } from '@angular/core';
import { ObjectiveComponent } from './objective/objective.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { MyTeamsComponent } from './my-teams/my-teams.component';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'OKRBOUNTEOUS';
  selectedTab = 'progress';
activeTab: any;
toggleUserInfoDropdown(): void {
  console.log('User info dropdown toggled');
}
}
