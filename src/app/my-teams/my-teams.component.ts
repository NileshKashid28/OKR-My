import { Component } from "@angular/core"

interface TeamMember {
  id: number
  name: string
  avatar: string
  progress: number
}

interface ObjectiveAssignment {
  userId: number
  userName: string
  avatar: string
  status: "pending" | "in-progress" | "completed"
}

interface Objective {
  id: number
  dueDate : string
  title: string
  description: string
  progress: number
  assignments: ObjectiveAssignment[]
  isExpanded: boolean
}

interface Team {
  id: number
  name: string
  members: TeamMember[]
  objectives: Objective[]
}

@Component({
  selector: "app-my-teams",
  templateUrl: "./my-teams.component.html",
  styleUrls: ["./my-teams.component.scss"],
})
export class MyTeamsComponent {
  teams: Team[] = [
    {
      id: 1,
      name: "Frontend",
      members: [
        { id: 1, name: "John Doe", avatar: "assets/avatars/user1.jpg", progress: 75 },
        { id: 2, name: "Jane Smith", avatar: "assets/avatars/user2.jpg", progress: 60 },
        { id: 3, name: "Mike Johnson", avatar: "assets/avatars/user3.jpg", progress: 90 },
        { id: 4, name: "Sarah Williams", avatar: "assets/avatars/user4.jpg", progress: 45 },
      ],
      objectives: [
        {
          id: 1,
          title: "Implement new dashboard UI",
          description: "Create a responsive dashboard with charts and widgets",
          progress: 65,
          dueDate:'2025-03-23',
          isExpanded: false,
          assignments: [
            { userId: 1, userName: "John Doe", avatar: "assets/avatars/user1.jpg", status: "in-progress" },
            { userId: 2, userName: "Jane Smith", avatar: "assets/avatars/user2.jpg", status: "completed" },
          ],
        },
        {
          id: 2,
          title: "Optimize page load performance",
          dueDate:'2025-03-23',
          description: "Improve initial load time by 30%",
          progress: 40,
          isExpanded: false,
          assignments: [
            { userId: 3, userName: "Mike Johnson", avatar: "assets/avatars/user3.jpg", status: "in-progress" },
            { userId: 4, userName: "Sarah Williams", avatar: "assets/avatars/user4.jpg", status: "pending" },
          ],
        },
      ],
  
    },
    {
      id: 2,
      name: "Backend",
      members: [
        { id: 5, name: "Alex Turner", avatar: "assets/avatars/user5.jpg", progress: 80 },
        { id: 6, name: "Emily Clark", avatar: "assets/avatars/user6.jpg", progress: 70 },
        { id: 7, name: "David Wilson", avatar: "assets/avatars/user7.jpg", progress: 55 },
      ],
      objectives: [
        {
          id: 3,
          title: "API performance optimization",
          dueDate:'2025-03-23',
          description: "Optimize database queries and caching",
          progress: 75,
          isExpanded: false,
          assignments: [
            { userId: 5, userName: "Alex Turner", avatar: "assets/avatars/user5.jpg", status: "completed" },
            { userId: 6, userName: "Emily Clark", avatar: "assets/avatars/user6.jpg", status: "in-progress" },
          ],
        },
        {
          id: 4,
          title: "Implement authentication service",
          dueDate:'2025-03-23',
          description: "Create JWT-based auth with role management",
          progress: 60,
          isExpanded: false,
          assignments: [
            { userId: 7, userName: "David Wilson", avatar: "assets/avatars/user7.jpg", status: "in-progress" },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Data Science",
      members: [
        { id: 8, name: "Lisa Chen", avatar: "assets/avatars/user8.jpg", progress: 85 },
        { id: 9, name: "Robert Kim", avatar: "assets/avatars/user9.jpg", progress: 65 },
        { id: 10, name: "Maria Garcia", avatar: "assets/avatars/user10.jpg", progress: 90 },
      ],
      objectives: [
        {
          id: 5,
          title: "Predictive analytics model",
          dueDate:'2025-03-23',
          description: "Develop user behavior prediction model",
          progress: 80,
          isExpanded: false,
          assignments: [
            { userId: 8, userName: "Lisa Chen", avatar: "assets/avatars/user8.jpg", status: "completed" },
            { userId: 9, userName: "Robert Kim", avatar: "assets/avatars/user9.jpg", status: "in-progress" },
          ],
        },
        {
          id: 6,
          title: "Data visualization dashboard",
          dueDate:'2025-03-23',
          description: "Create interactive charts for business metrics",
          progress: 70,
          isExpanded: false,
          assignments: [
            { userId: 10, userName: "Maria Garcia", avatar: "assets/avatars/user10.jpg", status: "in-progress" },
          ],
        },
      ],
    },
  ]

  toggleObjective(objective: Objective): void {
    objective.isExpanded = !objective.isExpanded
  }

  getChevronClass(isExpanded: boolean): string {
    return isExpanded ? "bi bi-chevron-up" : "bi bi-chevron-down"
  }

  getInitials(name: string): string {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  getAvatarColor(name: string): string {
    const colors = [
      "#4361ee", // primary
      "#3f37c9", // secondary
      "#4895ef", // accent
      "#4cc9f0", // success
      "#6c63ff",
      "#f72585",
      "#7209b7",
      "#3a0ca3",
      "#4361ee",
      "#4cc9f0",
    ]

    // Simple hash function to get consistent color for the same name
    const hash = name.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0)
    }, 0)

    return colors[hash % colors.length]
  }
}

