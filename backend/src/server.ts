import 'express-async-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import { connectDatabase } from '@config/database';
import env from '@config/env';
import routes from '@routes/index';
import { errorHandler } from '@middleware/errorHandler';
import { limiter } from '@middleware/rateLimiter';
import { AppError } from '@utils/appError';

const app: Express = express();

app.use(helmet());
app.use(compression());
app.use(morgan(env.isDevelopment ? 'dev' : 'combined'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(limiter);

app.use(routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  throw new AppError('Route not found', 404);
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      console.log(`✅ Server running on port ${env.PORT}`);
      console.log(`📍 API URL: ${env.API_URL}`);
      console.log(`🌍 Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
