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
import Exercise from './Exercise';
import TrainingsSequencies from './TrainingsSequencies';

@Entity('sequencies')
class Sequency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  exercise_id: string;

  @ManyToOne(() => Exercise, { eager: true })
  @JoinColumn({ name: 'exercise_id', referencedColumnName: 'id' })
  exercise: Exercise;

  @OneToMany(
    () => TrainingsSequencies,
    sequencyToTraining => sequencyToTraining.sequency,
  )
  trainings_sequencies: TrainingsSequencies[];

  @Column('int')
  sets: number;

  @Column('int')
  repetitions: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sequency;
