import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import log from 'middlewares/log';

const app = express();

app.use(cors());

app.use(express.json());

app.use(log);

app.get('/', (_, response) => {
  return response.json({ message: 'Hello World' });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
