import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Expose } from 'class-transformer';

import User from './User';
import TrainingsSequencies from './TrainingsSequencies';

@Entity('trainings')
class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  student_id: string;

  @Column()
  instructor_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'student_id' })
  student: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'instructor_id' })
  instructor: User;

  @OneToMany(
    () => TrainingsSequencies,
    sequencyToTraining => sequencyToTraining.training,
    {
      cascade: ['insert', 'update', 'remove'],
      eager: true,
    },
  )
  trainings_sequencies: TrainingsSequencies[];

  @Column('integer', { array: true })
  days: number[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'category' })
  getCategory(): string | null {
    if (!this.trainings_sequencies.length) {
      return null;
    }
    return this.trainings_sequencies[0].sequency?.exercise?.category?.name;
  }
}

export default Training;
