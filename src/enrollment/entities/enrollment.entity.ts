import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { Student } from '../../students/entities/students.entity';
import { ClazzCourse } from '../../clazz-course/entities/clazz-course.entity';
import { Result } from '../../results/entities/results.entity';
import { Constants } from '../../Constants/Constants';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: Constants.REGISTERED })
  status: string;

  @ManyToOne(() => Student, (student) => student.enrollments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => ClazzCourse, (clazzCourse) => clazzCourse.enrollments)
  @JoinColumn({ name: 'clazz_course_id' })
  clazzCourse: ClazzCourse;

  @OneToMany(() => Result, (result) => result.enrollment)
  results: Result[];
}
