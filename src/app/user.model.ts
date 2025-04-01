export class User {
    userId: number;
    username: string;
    designation: string;
    managerId: number | null;
    email: string;
    groupId?: number; // Optional property

    constructor(
        userId: number,
        username: string,
        designation: string,
        managerId: number | null,
        email: string,
        groupId?: number // Optional parameter in the constructor
    ) {
        this.userId = userId;
        this.username = username;
        this.designation = designation;
        this.managerId = managerId;
        this.email = email;
        this.groupId = groupId;
    }
}
