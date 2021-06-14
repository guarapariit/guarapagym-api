import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = new ShowProfileService();
    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { old_password, password } = request.body;

      const updateProfile = new UpdateProfileService();

      const user = await updateProfile.execute({
        user_id,
        old_password,
        password,
      });

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
