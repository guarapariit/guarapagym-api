import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';
import './database';

import log from './middlewares/log';
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(log);

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`🚀 Server started on port ${process.env.PORT || 3333}!`);
});
