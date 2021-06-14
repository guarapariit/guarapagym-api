import { getRepository, Repository, Not } from 'typeorm';

import User from '../models/User';

interface FindAllUsersDTO {
  except_user_id?: string;
  user_role?: number;
}

interface FindInstructorStudentsDTO {
  instructor_id: string;
}

interface CreateUserDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: number;
  password: string;
  days: number[];
  instructor_id?: string;
}

class UsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
    });

    return user;
  }

  public async findAll({
    except_user_id,
    user_role,
  }: FindAllUsersDTO): Promise<User[]> {
    const where: Record<string, any> = {};
    if (except_user_id) {
      where.id = Not(except_user_id);
    }
    if (user_role !== undefined) {
      where.role = user_role;
    }
    const users = await this.ormRepository.find({
      where,
    });

    return users;
  }

  public async findInstructorStudents({
    instructor_id,
  }: FindInstructorStudentsDTO): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        instructor_id,
        role: 0,
      },
    });

    return users;
  }

  public async create(userData: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
