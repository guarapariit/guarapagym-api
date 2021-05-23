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

  @ManyToOne(() => Exercise)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @OneToMany(
    () => TrainingsSequencies,
    sequencyToTraining => sequencyToTraining.sequency,
  )
  trainings_sequencies: TrainingsSequencies[];

  @Column()
  sets: number;

  @Column()
  repetitions: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sequency;
