import { Component } from "@angular/core"
// ModuleRegistry.registerModules([AllCommunityModule])
//

interface Task {
  name: string
  subtasks: string[]
}

interface Objective {
  id: number
  obj: string
  team: string
  progress: number
  dueDate: string
  tassk: Task[]
}

@Component({
  selector: "app-objective",
  imports: [],
  templateUrl: "./objective.component.html",
  styleUrl: "./objective.component.scss",
})
export class ObjectiveComponent {
  expandedObjective: number | null = null
  expandedTask: string | null = null
  showObjectiveForm = false
  showDeletePopup = false
  selectedObjectiveId: number | null = null

  // New objective form data
  newObjective: Objective = {
    id: 0,
    obj: "",
    team: "",
    progress: 0, // Initial progress is always 0
    dueDate: "",
    tassk: [{ name: "", subtasks: [] }],
  }

  objectives = [
    {
      id: 1,
      obj: "Improve User Experience",
      team: "Frontend",
      progress: 15,
      dueDate: "May 15, 2025",
      tassk: [
        { name: "Customer Portal Redesign", subtasks: ["Subtask 1", "Subtask 2"] },
        { name: "Task2", subtasks: ["Subtask 1", "Subtask 2"] },
        { name: "Task3", subtasks: ["Subtask 1"] },
        { name: "Task4", subtasks: [] },
      ],
    },
    {
      id: 2,
      obj: "Enhance API Performance",
      team: "Backend",
      progress: 65,
      dueDate: "Jun 30, 2025",
      tassk: [
        { name: "API Optimization Initiative", subtasks: ["Subtask A", "Subtask B"] },
        { name: "Task3", subtasks: [] },
        { name: "Task@", subtasks: ["Subtask 1"] },
      ],
    },
    {
      id: 3,
      obj: "Data Analytics Dashboard",
      team: "Data Science",
      progress: 50,
      dueDate: "Jul 15, 2025",
      tassk: [
        { name: "Business Intelligence Suite", subtasks: ["Subtask X", "Subtask Y"] },
        { name: "Task5", subtasks: [] },
      ],
    },
  ]

  Addobjective() {
    this.showObjectiveForm = true
    this.resetNewObjective()
  }

  // Show delete popup
  showDeleteObjectivePopup() {
    this.showDeletePopup = true
    this.selectedObjectiveId = null
  }

  // Cancel delete popup
  cancelDeletePopup() {
    this.showDeletePopup = false
    this.selectedObjectiveId = null
  }

  // Select objective to delete
  selectObjectiveToDelete(id: number) {
    this.selectedObjectiveId = id
  }

  // Delete the selected objective
  Delobjective() {
    if (this.selectedObjectiveId) {
      // Find the index of the objective to delete
      const index = this.objectives.findIndex((obj) => obj.id === this.selectedObjectiveId)

      if (index !== -1) {
        // Remove the objective at the found index
        this.objectives.splice(index, 1)
      }

      // Close the popup and reset selection
      this.showDeletePopup = false
      this.selectedObjectiveId = null
    }
  }

  calculateOverallProgress(): number {
    const totalObjectives = this.objectives.length
    if (totalObjectives === 0) return 0 // Prevent division by zero

    const totalProgress = this.objectives.reduce((sum, objective) => sum + objective.progress, 0)
    return Math.round(totalProgress / this.objectives.length) // Return average progress
  }

  toggleObjective(id: number) {
    this.expandedObjective = this.expandedObjective === id ? null : id
  }

  // New method to handle task check-in
  checkInTask(task: string): void {
    console.log(`Checked-in task: ${task}`)
    // You can also implement additional logic for marking the task as completed or updating the state
  }

  // Helper method to determine if the task is completed
  isTaskCompleted(task: string): boolean {
    // Logic to check if the task is completed
    // For simplicity, let's mark tasks with "Task1" as completed, you can change this logic
    return task.toLowerCase().includes("task1")
  }

  // New method to toggle subtask visibility
  toggleSubTask(taskName: string): void {
    this.expandedTask = this.expandedTask === taskName ? null : taskName
  }


  showSubPopup=false;
  checkInSubTask(Subtask: string): void {
    this.showSubPopup=true;
    this.checkIn()

  }

  checkIn(){

  }

  // New methods for objective form
  resetNewObjective() {
    this.newObjective = {
      id: this.getNextId(),
      obj: "",
      team: "",
      progress: 0, // Always set to 0
      dueDate: "",
      tassk: [{ name: "", subtasks: [] }],
    }

    // Reset form fields if they exist in the DOM
    setTimeout(() => {
      const titleInput = document.getElementById("objective-title") as HTMLInputElement
      const teamSelect = document.getElementById("objective-team") as HTMLSelectElement
      const dueDateInput = document.getElementById("objective-due-date") as HTMLInputElement

      if (titleInput) titleInput.value = ""
      if (teamSelect) teamSelect.value = ""
      if (dueDateInput) dueDateInput.value = ""
    }, 0)
  }

  getNextId(): number {
    return this.objectives.length > 0 ? Math.max(...this.objectives.map((o) => o.id)) + 1 : 1
  }

  addTask() {
    this.newObjective.tassk.push({ name: "", subtasks: [] })
  }

  removeTask(index: number) {
    if (this.newObjective.tassk.length > 1) {
      this.newObjective.tassk.splice(index, 1)
    }
  }

  // Add a subtask to a specific task
  addSubtask(taskIndex: number) {
    this.newObjective.tassk[taskIndex].subtasks.push("")
  }

  // Remove a subtask from a specific task
  removeSubtask(taskIndex: number, subtaskIndex: number) {
    this.newObjective.tassk[taskIndex].subtasks.splice(subtaskIndex, 1)
  }

  // Update subtask name
  updateSubtaskName(taskIndex: number, subtaskIndex: number, event: Event) {
    const input = event.target as HTMLInputElement
    this.newObjective.tassk[taskIndex].subtasks[subtaskIndex] = input.value
  }

  submitObjective() {
    // Filter out empty tasks
    this.newObjective.tassk = this.newObjective.tassk.filter((task) => task.name.trim() !== "")

    // Filter out empty subtasks for each task
    this.newObjective.tassk.forEach((task) => {
      task.subtasks = task.subtasks.filter((subtask) => subtask.trim() !== "")
    })

    // Add the new objective to the list
    this.objectives.push({ ...this.newObjective })

    // Hide the form
    this.showObjectiveForm = false
  }

  cancelObjectiveForm() {
    this.showObjectiveForm = false
  }

  // Update a field in the newObjective object
  updateObjectiveField(field: string, value: any): void {
    // Using type assertion to allow dynamic property access
    ;(this.newObjective as any)[field] = value
  }

  // Update task name at specific index
  updateTaskName(index: number, event: Event): void {
    const input = event.target as HTMLInputElement
    this.newObjective.tassk[index].name = input.value
  }
}
