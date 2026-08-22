# Lubricentro Meza

Sitio del centro automotriz **Lubricentro Meza**: catálogo de servicios, productos y neumáticos, cotización y WhatsApp. Sin carrito ni pagos.

Corre **100% en local** (solo Node.js). La base es un archivo SQLite.

## Stack

- **frontend/** — React + TypeScript + Vite + Tailwind
- **backend/** — Node.js + Express + TypeORM + SQLite

## Cómo ejecutarlo

Necesitas Node.js 20+.

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

La primera vez crea `backend/data/lubricentro.sqlite` y carga el catálogo.

API: http://127.0.0.1:43121/api

### 2. Frontend (otra terminal)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Sitio: http://127.0.0.1:43122

### Contacto / WhatsApp

Edita `backend/.env` (`SITE_WHATSAPP` sin `+` ni espacios, ej. `56987654321`).

## API

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/api/health` | Estado |
| GET | `/api/site` | Contacto y horario |
| GET | `/api/services` | Servicios |
| GET | `/api/services/:slug` | Detalle |
| GET | `/api/products` | Productos |
| GET | `/api/products/:slug` | Detalle |
| POST | `/api/quotes` | Cotización |

## Git

Puedes subir el repo tal cual. El SQLite (`backend/data/`) no se versiona: cada máquina lo genera al arrancar.
