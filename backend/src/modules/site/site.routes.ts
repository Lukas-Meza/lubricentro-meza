import { Router } from 'express';
import { appConfig } from '../../config/env';

export const siteRouter = Router();

// Datos publicos del taller: se leen del .env, el horario lo dejo fijo aca
siteRouter.get('/', (_req, res) => {
  const s = appConfig.site;
  res.json({
    data: {
      ...s,
      hours: [
        { day: 'lunes', label: 'Lunes', open: '08:30 – 18:30' },
        { day: 'martes', label: 'Martes', open: '08:30 – 18:30' },
        { day: 'miercoles', label: 'Miércoles', open: '08:30 – 18:30' },
        { day: 'jueves', label: 'Jueves', open: '08:30 – 18:30' },
        { day: 'viernes', label: 'Viernes', open: '08:30 – 18:30' },
        { day: 'sabado', label: 'Sábado', open: '08:30 – 14:00' },
        { day: 'domingo', label: 'Domingo', open: null },
      ],
    },
  });
});
