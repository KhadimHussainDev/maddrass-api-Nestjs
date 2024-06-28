import { Student } from '../../students/entities/students.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  admissionDate: string;

  @Column()
  department: string;

  @Column()
  admissionFee: number;

  @Column()
  receiptNumber: string;

  @Column()
  bookNumber: string;

  @Column()
  terminationDate: string;

  @Column()
  terminationReason: string;

  @ManyToOne(() => Student, (student) => student.admissions)
  student: Student;
}
