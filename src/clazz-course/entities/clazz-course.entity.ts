import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Course } from '../../courses/entites/courses.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { Exam } from '../../exams/entities/exams.entity';
import { ClazzYear } from '../../clazz-year/entities/clazz-year.entity';

@Entity()
export class ClazzCourse {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClazzYear, (clazzYear) => clazzYear.clazzCourses)
  @JoinColumn({ name: 'clazz_year_id' })
  clazzYear: ClazzYear;

  @ManyToOne(() => Course, (course) => course.clazzCourses)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.clazzCourse)
  enrollments: Enrollment[];

  @OneToMany(() => Exam, (exam) => exam.clazzCourse)
  exams: Exam[];
}
