import { Student } from "../entities/students.entity";

export class StudentResponse {
  meta: { totalStudents: number };
  data: Student[];

  constructor(partial: Partial<StudentResponse>) {
    Object.assign(this, partial);
  }
}
