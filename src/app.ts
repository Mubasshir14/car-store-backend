import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import cookieParser from 'cookie-parser';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
);

// application route
app.use('/api', router);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Car Store is Running 🏃‍♂️🏃‍♂️🏃🏃',
  });
};

app.get('/', getAController);
app.use(globalErrorHandler);
// app.use(notFound);

export default app;
