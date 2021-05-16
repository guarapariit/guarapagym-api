import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Exercise from './Exercise';

@Entity('sequencies')
class Sequency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  exercise_id: string;

  @ManyToOne(() => Exercise)
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

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
