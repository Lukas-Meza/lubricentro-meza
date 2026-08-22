# Lubricentro Meza

Sitio web y API del centro automotriz **Lubricentro Meza**: lubricación, mantenimiento de nivel 2, venta de neumáticos y repuestos. El usuario consulta el catálogo, arma una selección y solicita cotización (web o WhatsApp). No incluye carrito ni pagos.

## Estructura

```
frontend/   React + TypeScript + Vite + Tailwind CSS
backend/    NestJS + Prisma + PostgreSQL
```

## Requisitos

- Node.js 22+
- PostgreSQL 16 (local o Docker)

## Configuración

### Base de datos

Con Docker:

```bash
docker compose up -d
```

O crea una base `lubricentro_meza` y un usuario con los datos de `backend/.env.example`.

Copia variables:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Edita en `backend/.env` el teléfono, WhatsApp (`SITE_WHATSAPP` sin + ni espacios, ej. `56987654321`), correo y dirección.

### Backend

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
npm run start:dev
```

API en `http://127.0.0.1:43121/api`.

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/api/health` | Estado |
| GET | `/api/site` | Contacto, horario, WhatsApp |
| GET | `/api/services` | Servicios (`featured`, `category`, `q`) |
| GET | `/api/services/:slug` | Detalle de servicio |
| GET | `/api/products` | Productos y neumáticos |
| GET | `/api/products/:slug` | Detalle de producto |
| POST | `/api/quotes` | Solicitud de cotización |

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App en `http://127.0.0.1:43122`. En desarrollo Vite proxifica `/api` al backend.

## Marca y contenido

Nombre, teléfono, WhatsApp, correo y dirección salen de variables de entorno. Los servicios y productos de ejemplo se cargan con el seed y se pueden reemplazar después.

## Scripts útiles

```bash
# backend
npm run prisma:studio   # explorar datos
npm run build

# frontend
npm run build
npm run preview
```
