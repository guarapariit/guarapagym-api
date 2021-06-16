import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import ListStudentTrainingsService from '../services/ListStudentTrainingsService';

export default class StudentTrainingsController {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listStudentTraining = new ListStudentTrainingsService();

    const trainings = await listStudentTraining.execute({ id });

    const parsedTrainings = trainings.map(training => classToClass(training));

    return response.json(classToClass(parsedTrainings));
  }
}
