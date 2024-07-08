import { Constants } from '../../Constants/Constants';
import { Address } from '../../addresses/entities/addresses.entity';
import { Admission } from '../../admissions/entities/admissions.entity';
import { Contact } from '../../contacts/entities/contacts.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: Constants.PRESENT })
  type: string;

  @Column()
  cnic: string;

  @Column()
  fatherName: string;

  @Column()
  fatherCnic: string;

  @Column()
  guardianName: string;

  @Column()
  guardianCnic: string;

  @Column()
  bloodGroup: string;

  @Column()
  qualification: string;

  @Column()
  dateOfBirth: string;

  @Column()
  image: string;

  @OneToMany(() => Address, (address) => address.student, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  addresses: Address[];

  @OneToMany(() => Contact, (contact) => contact.student, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  contacts: Contact[];

  @OneToMany(() => Admission, (admission) => admission.student, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  admissions: Admission[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  enrollments: Enrollment[];
}
