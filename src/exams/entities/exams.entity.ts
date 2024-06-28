import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ClazzCourse } from '../../clazz-course/entities/clazz-course.entity';
import { Result } from '../../results/entities/results.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  totalMarks: number;

  @Column()
  date: Date;

  @Column()
  board: string;

  @Column()
  type: string; 

  @ManyToOne(() => ClazzCourse, (clazzCourse) => clazzCourse.exams)
  @JoinColumn({ name: 'clazz_course_id' })
  clazzCourse: ClazzCourse;

  @OneToMany(() => Result, (result) => result.exam) 
  results: Result[];
}
