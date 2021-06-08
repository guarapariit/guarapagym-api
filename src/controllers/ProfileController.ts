import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ShowProfileService from '../services/ShowProfileService';

export default class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = new ShowProfileService();
    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }
}
