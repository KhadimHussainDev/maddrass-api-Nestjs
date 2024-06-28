import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exam } from '../../exams/entities/exams.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  obtainedMarks: number;

  @Column()
  status: string; 

  @ManyToOne(() => Exam, (exam) => exam.results)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam; 

  @ManyToOne(() => Enrollment, (enrollment) => enrollment.results)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment; 
}
