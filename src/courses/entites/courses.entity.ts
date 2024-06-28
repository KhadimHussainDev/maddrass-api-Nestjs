import { ClazzCourse } from '../../clazz-course/entities/clazz-course.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ClazzCourse, (clazzCourse) => clazzCourse.course)
  clazzCourses: ClazzCourse[];
}
