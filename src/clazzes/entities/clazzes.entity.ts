import { ClazzCourse } from '../../clazz-course/entities/clazz-course.entity';
import { ClazzYear } from '../../clazz-year/entities/clazz-year.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Clazz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ClazzYear, (clazzYear) => clazzYear.clazz)
  clazzYears: ClazzYear[];


}
