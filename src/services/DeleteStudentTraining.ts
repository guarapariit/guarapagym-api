import TrainingsRepository from '../repositories/TrainingsRepository';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

interface IRequest {
  studentId: string;
  id: string;
}

class DeleteStudentTrainingService {
  private usersRepository = new UsersRepository();

  private trainingsRepository = new TrainingsRepository();

  public async execute({ studentId, id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(studentId);

    if (!user) {
      throw new AppError('Student does not exist.');
    }

    if (user.role !== 0) {
      throw new AppError('User is not a student.');
    }

    const training = await this.trainingsRepository.findById({
      id,
      studentId,
    });

    if (!training) {
      throw new AppError('Training does not exist on this student.');
    }

    await this.trainingsRepository.delete(training);
  }
}

export default DeleteStudentTrainingService;
