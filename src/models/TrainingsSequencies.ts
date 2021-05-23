import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import Sequency from './Sequency';

import Training from './Training';

@Entity('trainings_sequencies')
class TrainingsSequencies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Training, training => training.trainings_sequencies)
  @JoinColumn({ name: 'training_id' })
  training: Training;

  @ManyToOne(() => Sequency, sequency => sequency.trainings_sequencies)
  @JoinColumn({ name: 'sequency_id' })
  sequency: Sequency;

  @Column()
  sequency_id: string;

  @Column()
  training_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TrainingsSequencies;
