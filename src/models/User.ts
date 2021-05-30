import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  role: number;

  @Column()
  avatar: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column('integer', { array: true })
  days: number[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    if (!process.env.APP_API_URL) {
      return null;
    }

    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

  @Expose({ name: 'role_name' })
  getRoleName(): string | null {
    if (this.role < 0 && this.role > 2) {
      return null;
    }
    const roleArr = ['student', 'instructor', 'manager'];
    return roleArr[this.role];
  }

  @Expose({ name: 'days' })
  getStudentDaysAvailability(): number[] | undefined {
    if (this.role > 0) {
      return undefined;
    }
    return this.days;
  }
}

export default User;
