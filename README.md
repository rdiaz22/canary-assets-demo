# Canary Assets · Demo pública
![Banner](./public/banner.png)

Canary Assets es una **demostración realista** de un sistema moderno de gestión de activos informáticos, desarrollada como proyecto de portfolio para mostrar:

✔ Diseño UI/UX estilo SaaS  
✔ Dashboard profesional  
✔ Tabla filtrable  
✔ Gráficas dinámicas  
✔ Detalle completo del activo  
✔ Integración real con **Supabase**  
✔ Despliegue en **Vercel**

---

## 🚀 Tech Stack

- **React + Vite**
- **Tailwind CSS** (UI moderna estilo Linear/Arc)
- **Supabase** (Base de datos + vistas públicas)
- **Lucide React** (Iconografía moderna)
- **Vercel** (Hosting / Deploy)

---

## 📸 Capturas

> (Aquí colocas tú las imágenes reales de tu demo)

| Dashboard | Detalle de Activo |
|----------|-------------------|
| ![](./public/capture-dashboard.png) | ![](./public/capture-detail.png) |

---

## 🎯 Funcionalidades principales

### **Dashboard**
- Métricas en tiempo real
- Tabla con filtros avanzados
- Búsqueda instantánea
- Estado del activo con badges de colores
- Gráfica por categorías

### **Vista de detalle**
- Foto grande del activo
- Ficha técnica
- Acciones rápidas (Ver QR, Imprimir ficha)
- Panel lateral de información
- Enlace directo para móvil (uso con QR)

### **Acciones rápidas**
- Ir al inventario con scroll suave
- Registrar nuevo activo (demo)
- Escaneo de activos (demo)

---

## 🗂 Datos de ejemplo

Se incluyen 7 activos reales con fotos:

- Monitores (Lenovo)
- Portátiles (Dell)
- Impresoras (Brother)
- Routers (Ubiquiti UDM)
- Tablets (iPad)
- Más equipos de oficina

> Los datos se cargan desde `assets_public`, una vista de solo lectura en Supabase.

---

## 🔧 Cómo ejecutar en local

```bash
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

### Variables de entorno (Supabase)

En la raíz del proyecto crea un archivo `.env` con:

```bash
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_publica
```

> Usa **solo** la `anon key` pública de Supabase.  
> Nunca subas claves privadas ni service roles al repositorio.

---

## 🔐 Seguridad y vistas públicas

La app lee los datos desde la vista:

- `public.assets_public` → Vista de solo lectura con `security_invoker = on`

Esto significa:

- Las políticas de seguridad (RLS) se evalúan con el usuario que hace la consulta.
- La vista no usa `SECURITY DEFINER`, evitando saltarse RLS por error.

---

## 👤 Usuarios demo

En el login puedes usar estas credenciales de ejemplo:

- **Admin**: `admin / admin123`
- **Lector**: `lector / lector123`

> Ambos usuarios son puramente de demostración y no tienen relación con Supabase Auth.

---

## 📦 Scripts útiles

- `npm run dev` → entorno de desarrollo
- `npm run build` → build de producción
- `npm run preview` → previsualizar el build
- `npm run lint` → ejecutar ESLint

---

## 📄 Licencia

Este proyecto está publicado bajo la licencia **MIT**.  
Consulta el archivo `LICENSE` para más detalles.
***

