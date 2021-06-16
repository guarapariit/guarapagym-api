import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import DeleteStudentTrainingService from '../services/DeleteStudentTraining';
import UpdateStudentTrainingService from '../services/UpdatedUserTrainingService';
import ListStudentTrainingsService from '../services/ListStudentTrainingsService';
import CreateStudentTrainingService from '../services/CreateStudentTrainingService';
import ShowStudentTrainingService from '../services/ShowStudentTraining';

// import ListTrainingsService from '../services/ListTrainingsService';

export default class StudentTrainingsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { days, instructor_id, sequencies } = request.body;

    const createStudentTraining = new CreateStudentTrainingService();

    const training = await createStudentTraining.execute({
      days,
      instructor_id,
      sequencies,
      student_id: id,
    });
    return response.json(classToClass(training));
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listStudentTraining = new ListStudentTrainingsService();

    const trainings = await listStudentTraining.execute({ id });

    return response.json(trainings);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { studentId, id } = request.params;

    const showStudentTraining = new ShowStudentTrainingService();

    const training = await showStudentTraining.execute({
      studentId,
      id,
    });

    return response.json(training);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { studentId, id } = request.params;
    const { days, sequencies } = request.body;

    const updateStudentTraining = new UpdateStudentTrainingService();

    const training = await updateStudentTraining.execute({
      studentId,
      id,
      days,
      sequencies,
    });

    return response.json(training);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { studentId, id } = request.params;

    const deleteStudentTrainings = new DeleteStudentTrainingService();

    await deleteStudentTrainings.execute({ studentId, id });

    return response.send();
  }
}
