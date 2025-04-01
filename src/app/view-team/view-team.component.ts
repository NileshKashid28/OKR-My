import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class ViewTeamComponent implements OnInit {
  teams = [
    {
      id: 1,
      name: 'Development Team',
      members: [
        { name: 'John Doe' },
        { name: 'Jane Smith' },
        { name: 'Alice Johnson' },
        { name: 'Bob Brown' },
        { name: 'Chris Green' },
      ],
      objective: 'Develop and maintain application features.',
    },
    {
      id: 2,
      name: 'Marketing Team',
      members: [{ name: 'Michael Scott' }, { name: 'Pam Beesly' }],
      objective: 'Promote brand awareness and customer engagement.',
    },
    {
      id: 3,
      name: 'Design Team',
      members: [{ name: 'Jim Halpert' }, { name: 'Dwight Schrute' }],
      objective: 'Design UX/UI for new projects.',
    },
    {
      id: 4,
      name: 'QA Team',
      members: [
        { name: 'Emily White' },
        { name: 'Daniel Black' },
        { name: 'Sophia Martinez' },
        { name: 'Liam Garcia' },
        { name: 'Oliver Wilson' },
      ],
      objective: 'Ensure software quality through rigorous testing.',
    },
    {
      id: 5,
      name: 'UI/UX Design Team',
      members: [
        { name: 'Ava Taylor' },
        { name: 'Noah Harris' },
        { name: 'Mia Robinson' },
        { name: 'Lucas Walker' },
        { name: 'Ethan Hall' },
      ],
      objective: 'Design intuitive and user-friendly interfaces.',
    },
    {
      id: 6,
      name: 'Product Management Team',
      members: [
        { name: 'Grace Lewis' },
        { name: 'Henry Young' },
        { name: 'Chloe King' },
        { name: 'Jackson Scott' },
        { name: 'Amelia Adams' },
      ],
      objective: 'Define product vision and ensure alignment with business goals.',
    },
    {
      id: 7,
      name: 'DevOps Team',
      members: [
        { name: 'Logan Moore' },
        { name: 'Ella Perez' },
        { name: 'William Clark' },
        { name: 'Harper Wright' },
        { name: 'Benjamin Baker' },
      ],
      objective: 'Manage infrastructure and ensure smooth CI/CD processes.',
    },
    {
      id: 8,
      name: 'Marketing Team',
      members: [
        { name: 'Victoria Adams' },
        { name: 'James Turner' },
        { name: 'Avery Hill' },
        { name: 'Samuel Lewis' },
        { name: 'Isabella Allen' },
      ],
      objective: 'Promote the product and increase brand visibility.',
    },
    {
      id: 9,
      name: 'Customer Support Team',
      members: [
        { name: 'Liam White' },
        { name: 'Emma Johnson' },
        { name: 'Mason Lee' },
        { name: 'Sofia Thompson' },
        { name: 'Alexander Martin' },
      ],
      objective: 'Assist customers and resolve queries effectively.',
    },
    {
      id: 10,
      name: 'HR Team',
      members: [
        { name: 'Zoe Hernandez' },
        { name: 'Michael Evans' },
        { name: 'Evelyn Walker' },
        { name: 'Daniel Carter' },
        { name: 'Layla Rivera' },
      ],
      objective: 'Recruit, retain, and nurture company talent.',
    },
    {
      id: 11,
      name: 'Sales Team',
      members: [
        { name: 'Scarlett Gonzalez' },
        { name: 'Jack Ramirez' },
        { name: 'Levi Brooks' },
        { name: 'Hannah Jenkins' },
        { name: 'Nathan Campbell' },
      ],
      objective: 'Drive revenue and expand customer base.',
    },
    {
      id: 12,
      name: 'Security Team',
      members: [
        { name: 'Lily Flores' },
        { name: 'David Morgan' },
        { name: 'Madison Sanders' },
        { name: 'Joseph Price' },
        { name: 'Aria Cooper' },
      ],
      objective: 'Protect company data and ensure compliance.',
    },
  ];

  searchTerm: string = '';
  filteredTeams = [...this.teams];

  ngOnInit(): void {
    this.filteredTeams = this.teams;
  }

  searchTeams() {
    const searchTermLower = this.searchTerm.toLowerCase().trim();

    // Show all teams if search bar is cleared
    if (!searchTermLower) {
      this.filteredTeams = [...this.teams];
      return;
    }

    this.filteredTeams = this.teams.filter(
      (team) =>
        team.name.toLowerCase().includes(searchTermLower) ||
        team.members.some((member) =>
          member.name.toLowerCase().includes(searchTermLower)
        ) ||
        team.objective.toLowerCase().includes(searchTermLower)
    );
  }

  createTeam() {
    console.log('Navigate to create-team page');
    // Add navigation logic here if needed
  }
}
