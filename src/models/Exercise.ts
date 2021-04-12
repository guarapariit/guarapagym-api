import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Category from './Category';

@Entity('exercises')
class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, category => category.exercises)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  video_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Exercise;
