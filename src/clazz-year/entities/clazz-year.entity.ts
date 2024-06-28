import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Clazz } from '../../clazzes/entities/clazzes.entity';
import { ClazzCourse } from '../../clazz-course/entities/clazz-course.entity';

@Entity()
export class ClazzYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @ManyToOne(() => Clazz, (clazz) => clazz.clazzYears)
  clazz: Clazz;

  @OneToMany(() => ClazzCourse, (clazzCourse) => clazzCourse.clazzYear)
  clazzCourses: ClazzCourse[];
}
