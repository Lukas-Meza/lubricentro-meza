import cors from 'cors';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { appConfig } from './config/env';
import { productsRouter } from './modules/products/products.routes';
import { quotesRouter } from './modules/quotes/quotes.routes';
import { servicesRouter } from './modules/services/services.routes';
import { siteRouter } from './modules/site/site.routes';

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: appConfig.frontendUrl,
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      data: { status: 'ok', service: 'lubricentro-meza-api' },
    });
  });

  app.use('/api/site', siteRouter);
  app.use('/api/services', servicesRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/quotes', quotesRouter);

  app.use(
    (
      error: unknown,
      _req: Request,
      res: Response,
      _next: NextFunction,
    ) => {
      console.error(error);
      res.status(500).json({
        data: null,
        error: {
          statusCode: 500,
          message: 'Error interno del servidor',
        },
      });
    },
  );

  return app;
}
