# Sinergia · Landing page

Landing page estática (HTML + CSS + JS), responsive, recreada a partir del diseño actual de `sinergiaacademia.com` (Elementor). Pensada para subirse a WordPress.

## Estructura

```
index.html        Página completa (header, hero, secciones, footer)
css/style.css      Estilos y breakpoints responsive
js/script.js       Menú móvil + estado activo del menú al hacer scroll
images/            Logo y fotos
```

## Imágenes pendientes de sustituir

Los siguientes ficheros son marcadores de posición generados y deben cambiarse por los reales (mismo nombre de archivo, así no hay que tocar el HTML):

- `images/logo.svg` → logo real de Sinergia (recomendado: exportar como SVG o PNG con fondo transparente).
- `images/hero-classroom.svg` → foto del aula (sección "Aprender puede ser diferente").
- `images/esto-es-sinergia.svg` → foto de la alumna estudiando (sección "Esto es Sinergia").

Si el archivo real es `.png` o `.jpg`, sustituye la ruta correspondiente en `index.html` (etiquetas `<img src="images/...">`).

## Cómo subirla a WordPress

Hay tres formas, de más a menos recomendable:

### Opción A — Página nueva con bloque HTML personalizado (rápida)
1. En el escritorio de WordPress, crea una página nueva (o edita "Inicio nueva").
2. Añade un bloque **HTML personalizado** (o el widget "HTML" de Elementor).
3. Pega el contenido de `index.html` **solo desde `<header>` hasta el `</footer>`** (sin `<html>`, `<head>` ni `<body>`).
4. Sube `css/style.css` y `js/script.js` como archivos del tema (o pégalos en **Apariencia → Personalizar → CSS adicional** el contenido de `style.css`, y añade `script.js` con un plugin tipo "Insert Headers and Footers").
5. Sube las imágenes de `images/` a la Biblioteca de medios y actualiza las rutas `src` si cambian de URL.

### Opción B — Plantilla de página en el tema (recomendada si tienes acceso a archivos del tema)
1. Copia `index.html`, `css/style.css`, `js/script.js` e `images/` a tu tema hijo.
2. Crea una plantilla de página personalizada en el tema que incluya el `<head>` de WordPress (`wp_head()`) y el pie (`wp_footer()`), y pega el contenido de `<body>` de `index.html` dentro.
3. Asigna esa plantilla a la página "Inicio" desde el editor.

### Opción C — Como página independiente (sin integrar en el tema)
Sube los 4 archivos/carpetas tal cual (por FTP o el gestor de archivos del hosting) a una subcarpeta, por ejemplo `/landing/`, y accede directamente a `index.html`. Útil para pruebas rápidas antes de integrarla en WordPress.

## Notas
- El botón "Cómo llegar" y el mapa incrustado usan la dirección **Av. d'Albaida, 18 · Entresuelo 6, 46870 Ontinyent**. Cambia la URL del `<iframe>` si la dirección varía.
- Los enlaces de WhatsApp, Instagram y Email en el footer son de ejemplo (`https://wa.me/34600000000`, `instagram.com/sinergiaacademia`, `info@sinergiaacademia.com`) — actualízalos con los datos reales.
- La tipografía usada es **Poppins** (Google Fonts), ya enlazada en el `<head>`.
- El diseño es responsive: menú hamburguesa por debajo de 768px, grids que pasan de 4→2→1 columnas según el ancho.
