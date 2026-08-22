# Lubricentro Meza

Sitio web del centro automotriz **Lubricentro Meza** (lubricación, nivel 2, neumáticos y repuestos). El usuario ve el catálogo, arma una selección y pide cotización por el formulario o WhatsApp. **No hay carrito ni pagos.**

Pensado para correr **100% en local** (sin Docker ni PostgreSQL). La base de datos es un archivo SQLite que se crea solo.

## Estructura

```
frontend/   React + TypeScript + Vite + Tailwind
backend/    NestJS + TypeORM + SQLite
```

## Requisitos

- Node.js 20+ (recomendado 22)

## Cómo ejecutarlo en local

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

La primera vez crea `backend/data/lubricentro.sqlite` y carga servicios/productos de ejemplo.

API: http://127.0.0.1:43121/api

### 2. Frontend (otra terminal)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Sitio: http://127.0.0.1:43122

### Personalizar contacto

Edita `backend/.env`:

- `SITE_WHATSAPP` → número sin `+` ni espacios (ej. `56987654321`)
- `SITE_PHONE`, `SITE_EMAIL`, `SITE_ADDRESS`, etc.

## API (resumen)

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/api/health` | Estado |
| GET | `/api/site` | Contacto y horario |
| GET | `/api/services` | Servicios |
| GET | `/api/services/:slug` | Detalle |
| GET | `/api/products` | Productos / neumáticos |
| GET | `/api/products/:slug` | Detalle |
| POST | `/api/quotes` | Cotización |

## Compartir por Git

Puedes subir el repo tal cual. Quien lo clone solo necesita Node y seguir los pasos de arriba. El archivo SQLite (`backend/data/`) no se versiona: cada máquina genera el suyo al arrancar.
