# Lubricentro Meza

Sitio web del taller **Lubricentro Meza**: catálogo de servicios y productos, cotización y envío por WhatsApp.

Funciona **en local** con Node.js. No necesita carrito ni pagos en línea.

---

## Qué incluye

- Página de inicio, servicios, productos, nosotros y contacto
- Catálogo con precios referenciales
- Cotización: el cliente elige ítems y envía un mensaje por WhatsApp al taller
- Base de datos local (SQLite) con servicios, productos y cotizaciones
- Datos de contacto / WhatsApp configurables en un archivo `.env`

---

## Requisitos

Antes de empezar, instala:

1. **Node.js 20 o superior** — [https://nodejs.org](https://nodejs.org)  
   Comprueba la versión:
   ```bash
   node -v
   npm -v
   ```
2. Un editor (por ejemplo VS Code o Cursor) y una terminal.

En Windows, PowerShell o CMD sirven igual.

---

## Estructura del proyecto

```
lubricentro-meza/
├── backend/          → API (Express + SQLite)
│   ├── .env.example  → plantilla de configuración
│   ├── data/         → se crea solo (archivo SQLite)
│   └── src/
└── frontend/         → sitio web (React + Vite)
    └── public/images → fotos del catálogo y páginas
```

Hay que tener **dos terminales** abiertas: una para el backend y otra para el frontend.

---

## Instalación paso a paso

### 1. Clonar o abrir el proyecto

Si viene de Git:

```bash
git clone <url-del-repositorio>
cd lubricentro-meza
```

Si ya tienes la carpeta, entra a ella.

### 2. Configurar y arrancar el backend

```bash
cd backend
```

Copia la plantilla de entorno (solo la primera vez):

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**Mac / Linux:**
```bash
cp .env.example .env
```

Instala dependencias y arranca:

```bash
npm install
npm run dev
```

Si todo va bien verás algo como:

```text
API Lubricentro Meza en http://127.0.0.1:3000/api
```

La **primera vez** se crea el archivo:

`backend/data/lubricentro.sqlite`

y se cargan servicios y productos de ejemplo (seed).

Deja esta terminal abierta.

### 3. Configurar y arrancar el frontend

Abre **otra** terminal:

```bash
cd frontend
```

Copia el `.env` si existe plantilla (solo la primera vez):

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**Mac / Linux:**
```bash
cp .env.example .env
```

Instala y arranca:

```bash
npm install
npm run dev
```

Abre el navegador en:

**http://127.0.0.1:5173**

El frontend reenvía las llamadas `/api` al backend en el puerto `3000` (ya está configurado en Vite).

---

## Cómo usarlo en el día a día

1. Arranca el **backend** (`cd backend` → `npm run dev`).
2. Arranca el **frontend** (`cd frontend` → `npm run dev`).
3. Entra a **http://127.0.0.1:5173**.

### Flujo de cotización por WhatsApp

1. El cliente entra a **Servicios** o **Productos**.
2. Pulsa **Cotizar** en lo que necesite (puede elegir varios).
3. Va a **Cotizar**, completa nombre y teléfono.
4. Pulsa **Enviar cotización por WhatsApp**.
5. Se abre WhatsApp con un mensaje listo: nombres, cantidades, precios y total referencial.
6. El mensaje se envía al número del taller configurado en `SITE_WHATSAPP`.

El chat llega desde el WhatsApp del cliente; tú siempre ves su número como remitente.

---

## Configurar datos del taller

Edita `backend/.env` (después de copiarlo desde `.env.example`).

| Variable | Qué es | Ejemplo |
| --- | --- | --- |
| `SITE_NAME` | Nombre del negocio | `Lubricentro Meza` |
| `SITE_PHONE` | Teléfono visible en la web | `+56 9 7154 3327` |
| `SITE_WHATSAPP` | Número que **recibe** los mensajes (solo dígitos, con código país) | `56971543327` |
| `SITE_EMAIL` | Correo de contacto | `contacto@lubricentromeza.cl` |
| `SITE_ADDRESS` | Dirección | `Av. San Miguel 2450` |
| `SITE_CITY` | Ciudad | `Talca` |
| `SITE_REGION` | Región | `Región del Maule` |
| `SITE_MAPS_QUERY` | Texto para el mapa de Google | `Av. San Miguel 2450, Talca, Región del Maule, Chile` |
| `PORT` | Puerto de la API | `3000` |
| `FRONTEND_URL` | URL del frontend (CORS) | `http://127.0.0.1:5173` |
| `SQLITE_PATH` | Ruta del archivo SQLite | `./data/lubricentro.sqlite` |

**Importante sobre WhatsApp:**  
`SITE_WHATSAPP` debe ir **sin** `+` ni espacios. Chile: `56` + número (ej. `56971543327`).

Después de cambiar el `.env`, **reinicia el backend** (Ctrl+C y otra vez `npm run dev`) para que tome los valores nuevos.

---

## Base de datos (SQLite)

El proyecto usa **SQLite**: un archivo local, no un servidor aparte.

- Ubicación: `backend/data/lubricentro.sqlite`
- Se crea solo al arrancar el backend por primera vez
- Guarda: **servicios**, **productos** y **cotizaciones**
- El contacto del taller (teléfono, dirección, WhatsApp) sale del `.env`, no de la base

Esa carpeta `backend/data/` **no se sube a Git**. Cada máquina genera su propia base al iniciar.

Si quieres “resetear” el catálogo:

1. Detén el backend.
2. Borra `backend/data/lubricentro.sqlite` (y si existen, archivos `.sqlite` relacionados).
3. Vuelve a correr `npm run dev` en `backend`.  
   Se crea de nuevo y se vuelve a cargar el seed.

Las imágenes del catálogo están en `frontend/public/images/`. Las rutas se definen en `backend/src/database/seed.ts`.

---

## URLs útiles

| Qué | URL |
| --- | --- |
| Sitio web | http://127.0.0.1:5173 |
| API | http://127.0.0.1:3000/api |
| Salud de la API | http://127.0.0.1:3000/api/health |

### Rutas principales de la API

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/health` | Comprueba que la API está viva |
| GET | `/api/site` | Nombre, contacto, horario, mapa |
| GET | `/api/services` | Lista de servicios |
| GET | `/api/services/:slug` | Detalle de un servicio |
| GET | `/api/products` | Lista de productos |
| GET | `/api/products/:slug` | Detalle de un producto |
| POST | `/api/quotes` | Guardar una cotización (opcional; el flujo principal usa WhatsApp) |

---

## Páginas del sitio

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio |
| `/servicios` | Listado de servicios |
| `/servicios/:slug` | Detalle de servicio |
| `/productos` | Catálogo |
| `/productos/:slug` | Detalle de producto |
| `/nosotros` | Quiénes somos |
| `/contacto` | Dirección, teléfono, mapa |
| `/cotizar` | Armar y enviar cotización por WhatsApp |

---

## Problemas frecuentes

### El frontend carga pero no hay servicios ni productos
- Revisa que el **backend** esté corriendo en el puerto `3000`.
- Abre http://127.0.0.1:3000/api/health — debe responder OK.
- Mira la terminal del backend por errores al crear SQLite.

### Error al instalar el backend (`better-sqlite3`)
En Windows a veces hace falta herramientas de compilación. Prueba:
```bash
npm install
```
de nuevo. Si falla, instala [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) (workload “Desktop development with C++”) o usa Node LTS e intenta otra vez.

### WhatsApp abre otro número o no abre
- Revisa `SITE_WHATSAPP` en `backend/.env` (solo dígitos, con `56`).
- Reinicia el backend tras editar el `.env`.

### El mapa o la dirección no cambian
- Edita `SITE_ADDRESS`, `SITE_CITY`, `SITE_REGION` y `SITE_MAPS_QUERY`.
- Reinicia el backend y recarga el navegador.

### Puerto ocupado
- Backend: cambia `PORT` en `backend/.env`.
- Frontend: Vite usa `5173`; si está ocupado, la terminal mostrará otro puerto.

---

## Scripts disponibles

### Backend (`cd backend`)

| Comando | Uso |
| --- | --- |
| `npm run dev` | Desarrollo (recarga al guardar) |
| `npm start` | Arranque simple con tsx |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm run start:prod` | Corre la versión compilada |

### Frontend (`cd frontend`)

| Comando | Uso |
| --- | --- |
| `npm run dev` | Desarrollo (Vite) |
| `npm run build` | Build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run lint` | Revisa el código |

---

## Resumen rápido

```bash
# Terminal 1
cd backend
cp .env.example .env   # solo la primera vez
npm install            # solo la primera vez
npm run dev

# Terminal 2
cd frontend
cp .env.example .env   # solo la primera vez
npm install            # solo la primera vez
npm run dev
```

Luego abre **http://127.0.0.1:5173** y edita `backend/.env` con el WhatsApp y la dirección reales del taller.
