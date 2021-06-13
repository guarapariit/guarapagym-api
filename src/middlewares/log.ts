import { Request, Response, NextFunction } from 'express';

const getActualRequestDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9; // convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export default function demoLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const currentDatetime = new Date();
  const parsedMonth = String(currentDatetime.getMonth() + 1).padStart(2, '0');
  const parsedDay = String(currentDatetime.getDate()).padStart(2, '0');
  const parsedHour = String(currentDatetime.getHours()).padStart(2, '0');
  const parsedMinute = String(currentDatetime.getMinutes()).padStart(2, '0');
  const parsedSecond = String(currentDatetime.getSeconds()).padStart(2, '0');

  const formattedDate = `${currentDatetime.getFullYear()}-${parsedMonth}-${parsedDay} ${parsedHour}:${parsedMinute}:${parsedSecond}`;
  const { method } = req;
  const { url } = req;
  const status = res.statusCode;
  const start = process.hrtime();
  const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
  const log = `[${formattedDate}] ${method} ${url} ${status} ${
    durationInMilliseconds * 10000
  } ms`;
  console.log(log);
  return next();
}
