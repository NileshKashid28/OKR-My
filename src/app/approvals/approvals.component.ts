import { Component } from '@angular/core';
interface Employee {
  id: number;
  name: string;
  role: string;
  team: string;
  initials: string;
  progress: number;
  objectives: string;
  keyResults: string;
  completedTasks: number;
  pendingTasks: number;
}

interface Approval {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeInitials: string;
  taskTitle: string;
  objectiveTitle: string;
  submittedDate: string;
}


@Component({
  selector: 'app-approvals',
  imports: [],
  templateUrl: './approvals.component.html',
  styleUrl: './approvals.component.scss'
})
export class ApprovalsComponent {
  approvalView: boolean = false;
  expandedEmployee: number | null = null;

  employees: Employee[] = [
      { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', team: 'Frontend', initials: 'AJ', progress: 80, objectives: 'Improve UI', keyResults: 'Complete 3 UI redesigns', completedTasks: 5, pendingTasks: 2 },
      { id: 2, name: 'Bob Smith', role: 'Backend Engineer', team: 'Backend', initials: 'BS', progress: 60, objectives: 'Optimize APIs', keyResults: 'Reduce response time by 30%', completedTasks: 3, pendingTasks: 3 },
  ];

  pendingApprovals: Approval[] = [
      { id: 101, employeeId: 1, employeeName: 'Alice Johnson', employeeInitials: 'AJ', taskTitle: 'Revamp Dashboard', objectiveTitle: 'Improve UI', submittedDate: '2025-03-18' },
      { id: 102, employeeId: 2, employeeName: 'Bob Smith', employeeInitials: 'BS', taskTitle: 'Refactor API Code', objectiveTitle: 'Optimize APIs', submittedDate: '2025-03-17' }
  ];

  filteredEmployees = [...this.employees];

  toggleEmployee(employeeId: number) {
      this.expandedEmployee = this.expandedEmployee === employeeId ? null : employeeId;
  }

  getEmployeePendingApprovals(employeeId: number): Approval[] {
      return this.pendingApprovals.filter(approval => approval.employeeId === employeeId);
  }

  approveTask(approvalId: number) {
      this.pendingApprovals = this.pendingApprovals.filter(approval => approval.id !== approvalId);
  }

  rejectTask(approvalId: number) {
      this.pendingApprovals = this.pendingApprovals.filter(approval => approval.id !== approvalId);
  }

  updateSearch(event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
      this.filteredEmployees = this.employees.filter(emp =>
          emp.name.toLowerCase().includes(searchTerm) || emp.role.toLowerCase().includes(searchTerm)
      );
  }

  updateTeamFilter(event: Event) {
      const selectedTeam = (event.target as HTMLSelectElement).value;
      this.filteredEmployees = selectedTeam === 'all' ? [...this.employees] : this.employees.filter(emp => emp.team === selectedTeam);
  }

  formatDate(dateString: string): string {
      const date = new Date(dateString);
      return date.toLocaleDateString();
  }
}

