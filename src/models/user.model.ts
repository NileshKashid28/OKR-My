export class User {
  userId: number;
  username: string;
  designation: string;
  managerId: number | null;
  email: string;
  groupId?: number;
  roles: string[]; // Add this

  constructor(
    userId: number,
    username: string,
    designation: string,
    managerId: number | null,
    email: string,
    roles: string[], // Include roles in constructor
    groupId?: number
  ) {
    this.userId = userId;
    this.username = username;
    this.designation = designation;
    this.managerId = managerId;
    this.email = email;
    this.roles = roles;
    this.groupId = groupId;
  }
}
