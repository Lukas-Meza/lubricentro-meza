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

// Armo la app Express aca para poder testearla o levantarla desde index.
export function createApp() {
  const app = express();

  // Solo dejo pasar al frontend local (Vite)
  app.use(
    cors({
      origin: appConfig.frontendUrl,
      methods: ['GET', 'POST', 'OPTIONS'],
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));

  // Ping rapido para saber si la API esta viva
  app.get('/api/health', (_req, res) => {
    res.json({
      data: { status: 'ok', service: 'lubricentro-meza-api' },
    });
  });

  // Rutas del catalogo y contacto
  app.use('/api/site', siteRouter);
  app.use('/api/services', servicesRouter);
  app.use('/api/products', productsRouter);
  app.use('/api/quotes', quotesRouter);

  // Cualquier error no manejado cae aca
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
