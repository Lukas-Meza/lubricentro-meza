import 'reflect-metadata';
import { createApp } from './app';
import { appConfig } from './config/env';
import { initDatabase } from './database/data-source';
import { seedIfEmpty } from './database/seed';

async function main() {
  const dataSource = await initDatabase();
  await seedIfEmpty(dataSource);

  const app = createApp();
  app.listen(appConfig.port, '0.0.0.0', () => {
    console.log(
      `API Lubricentro Meza en http://127.0.0.1:${appConfig.port}/api`,
    );
  });
}

main().catch((error) => {
  console.error('No se pudo iniciar el backend', error);
  process.exit(1);
});
