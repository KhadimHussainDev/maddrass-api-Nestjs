import { Student } from '../../students/entities/students.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  addressText: string;

  @Column()
  tehsil: string;

  @Column()
  district: string;

  @ManyToOne(() => Student, (student) => student.addresses, {
    onDelete: 'CASCADE',
  })
  student: Student;
}
