import { Student } from '../../students/entities/students.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @ManyToOne(() => Student, (student) => student.contacts, {
    onDelete: 'CASCADE',
  })
  student: Student;
}
