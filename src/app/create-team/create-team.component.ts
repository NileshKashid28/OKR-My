import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class CreateTeamComponent implements OnInit {
  createTeamForm!: FormGroup;
  employees: string[] = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown',
    'Charlie White',
    'David Wilson',
    'Emma Davis',
    'Michael Scott',
    'Olivia Taylor',
    'Sophia Miller',
  ];
  filteredEmployees: string[] = [];
  selectedEmployees: string[] = [];
  searchTerm: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamLead: ['', Validators.required],
      description: [''],
    });
    this.filteredEmployees = [...this.employees];
  }

  // Update search term and filter employees dynamically
  updateSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.filterEmployees();
  }
  

  // Filter employees dynamically based on search term and exclude already selected ones
  filterEmployees() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees
      .filter(
        (employee) =>
          employee.toLowerCase().includes(searchTermLower) &&
          !this.selectedEmployees.includes(employee)
      )
      .sort(); // Optional: Sort filtered list alphabetically
  }

  // Toggle employee selection (add/remove)
  toggleEmployee(employee: string) {
    if (this.selectedEmployees.includes(employee)) {
      this.removeEmployee(employee);
    } else {
      this.selectedEmployees.push(employee);
    }
    this.filterEmployees(); // Refresh list after selection
  }

  // Remove an employee from the selected list
  removeEmployee(employee: string) {
    this.selectedEmployees = this.selectedEmployees.filter(
      (e) => e !== employee
    );
    this.filterEmployees(); // Refresh list after removal
  }

  // Create team submission
  createTeam() {
    if (this.createTeamForm.valid) {
      const teamData = {
        teamName: this.createTeamForm.get('teamName')?.value,
        teamLead: this.createTeamForm.get('teamLead')?.value,
        description: this.createTeamForm.get('description')?.value,
        employees: this.selectedEmployees,
      };
      console.log('Team Created:', teamData);
      alert('Team Created Successfully!');
      this.resetForm();
    }
  }

  // Cancel form
  cancel() {
    this.resetForm();
  }

  // Reset form and clear selection
  resetForm() {
    this.createTeamForm.reset();
    this.selectedEmployees = [];
    this.searchTerm = '';
    this.filteredEmployees = [...this.employees];
  }
}