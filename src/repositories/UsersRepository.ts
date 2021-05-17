import { getRepository, Repository, Not } from 'typeorm';

import User from '../models/User';

interface FindAllUsersDTO {
  except_user_id?: string;
  user_role?: 0 | 1 | 2;
}

interface CreateUserDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: 0 | 1 | 2;
  password: string;
  days: number[];
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
    const users = await this.ormRepository.find({
      where: {
        id: except_user_id ? Not(except_user_id) : undefined,
        role: user_role ?? undefined,
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
