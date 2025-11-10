# 🎵 MiniSpotify

> Una aplicación móvil moderna de streaming de música construida con React Native, Expo y la API de Spotify.

---

## 📱 Demo

<!-- TODO: Añadir GIF de demostración aquí -->
<div align="center">
  <img src="./assets/demo.gif" alt="Demo de la aplicación" width="300"/>
  <p><i>Captura de pantalla de la aplicación en funcionamiento</i></p>
</div>

---

## ✨ Características

- 🎨 **Interfaz Moderna**: Diseño inspirado en Spotify con temas personalizables
- 🔐 **Autenticación OAuth**: Login seguro con tu cuenta de Spotify
- 🎵 **Reproductor de Audio**: Escucha previews de tus canciones favoritas
- 📱 **Responsive Design**: Optimizado para iOS y Android
- 🌙 **Múltiples Temas**: Tema oscuro, azul y púrpura disponibles
- ⚡ **NativeWind**: Styling con utilidades de Tailwind CSS
- 🎯 **TypeScript**: Tipado fuerte para mejor developer experience
- 📊 **Playlists Inteligentes**: Explora y reproduce playlists de Spotify

---

## 🛠️ Stack Tecnológico

### **Core**
- **[React Native](https://reactnative.dev/)** - Framework móvil multiplataforma
- **[Expo](https://expo.dev/)** - Plataforma de desarrollo y deployment
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático

### **Navegación & UI**
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - Sistema de navegación basado en archivos
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS para React Native
- **[Expo Vector Icons](https://icons.expo.fyi/)** - Librería de iconos

### **Estado & Validación**
- **[Zod](https://zod.dev/)** - Validación de schemas TypeScript-first
- **[React Hooks](https://react.dev/reference/react)** - Manejo de estado local

### **Integración & APIs**
- **[Spotify Web API](https://developer.spotify.com/documentation/web-api)** - API oficial de Spotify
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)** - Autenticación OAuth2

### **Audio**
- **[Expo AV](https://docs.expo.dev/versions/latest/sdk/av/)** - Reproducción de audio y video

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**

- Node.js 18+ 
- npm o yarn
- Expo CLI (`npm install -g expo-cli`)
- Cuenta de desarrollador de Spotify

### **1. Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/minispotify.git
cd minispotify
```

### **2. Instalar dependencias**

```bash
npm install
# o
yarn install
```

### **3. Configurar credenciales de Spotify**

1. Ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crea una nueva aplicación
3. Obtén tu `Client ID` y `Client Secret`
4. Configura el Redirect URI: `exp://127.0.0.1:19000/--/`

Actualiza las credenciales en:

**`api/spotidownloader.ts`**
```typescript
const CLIENT_ID = "TU_CLIENT_ID";
const CLIENT_SECRET = "TU_CLIENT_SECRET";
```

**`components/SpotifyAuthScreen.tsx`**
```typescript
const CLIENT_ID = "TU_CLIENT_ID";
```

### **4. Ejecutar la aplicación**

```bash
# Iniciar Expo Dev Server
npx expo start

# O específicamente para:
npx expo start --ios      # iOS
npx expo start --android  # Android
npx expo start --web      # Web (experimental)
```

---

## 📁 Estructura del Proyecto

```
insumo-2/
├── api/
│   └── spotidownloader.ts       # Servicios de Spotify API
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Layout de tabs
│   │   ├── index.tsx            # Dashboard principal
│   │   ├── settings.tsx         # Configuración
│   │   └── playlist.tsx         # Vista de playlist
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Login/Registro
│   └── +not-found.tsx           # 404 page
├── components/
│   ├── DashboardContent.tsx     # Contenido del dashboard
│   ├── Info.tsx                 # Banner de información
│   ├── LoginForm.tsx            # Formulario de login
│   ├── RegisterForm.tsx         # Formulario de registro
│   ├── NowPlaying.tsx           # Mini reproductor
│   ├── SpotifyAuthScreen.tsx    # Autenticación OAuth
│   └── playlistScreen.tsx       # Lista de canciones
├── constants/
│   └── Colors.ts                # Paletas de colores y temas
├── lib/
│   ├── Schemas/Validations/
│   │   ├── loginValidation.ts   # Validación de login
│   │   └── registerValidation.ts # Validación de registro
│   └── constants/
│       └── ErrorMessages.ts     # Mensajes de error
└── README.md
```

---

## 🎨 Temas Disponibles

La aplicación incluye tres temas predefinidos en `constants/Colors.ts`:

### **🟢 Tema Principal (Spotify-like)**
```typescript
{
  primary: '#1DB954',      // Verde Spotify
  secondary: '#191414',    // Negro profundo
  background: '#121212',   // Gris oscuro
  accent: '#1ED760',       // Verde brillante
}
```

### **🔵 Tema Azul**
```typescript
{
  primary: '#1E88E5',      // Azul material
  background: '#0D1B2A',   // Azul marino
  accent: '#3A9BDC',       // Azul cielo
}
```

### **🟣 Tema Púrpura**
```typescript
{
  primary: '#9B59B6',      // Púrpura vibrante
  background: '#121212',   // Negro
  accent: '#BB86FC',       // Púrpura claro
}
```

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm start              # Iniciar Expo dev server
npm run android        # Ejecutar en Android
npm run ios            # Ejecutar en iOS
npm run web            # Ejecutar en navegador

# Producción
npm run build          # Build para producción
eas build --platform android  # Build con EAS
eas build --platform ios      # Build iOS
```

---

## 🔐 Autenticación y Seguridad

### **Flujo de Autenticación**

1. **Login Local** (Mock)
   - Validación de formulario con Zod
   - Verificación de formato de email
   - Requisitos de contraseña: 8+ caracteres, mayúscula, caracter especial

2. **OAuth con Spotify**
   - Implicit Grant Flow
   - Permisos: `user-read-private`, `playlist-read-private`
   - Token temporal almacenado en memoria

### **⚠️ Nota de Seguridad**

Las credenciales en `api/spotidownloader.ts` están hardcodeadas para propósitos de desarrollo. Para producción:

- Usa variables de entorno con `expo-constants`
- Implementa un backend proxy para manejar tokens
- Nunca expongas credenciales en el código del cliente

---

## 🎯 Características Principales

### **Dashboard**
- Selección de géneros musicales
- Playlists recomendadas
- Mini reproductor persistente

### **Reproductor**
- Preview de 30 segundos por canción
- Controles play/pause
- Visualización de artwork y metadata
- Estado de reproducción persistente

### **Playlists**
- Integración con Spotify Web API
- Lista scrolleable de tracks
- Covers de alta calidad
- Información de artistas

---

## 🐛 Problemas Conocidos

- [ ] Preview URL puede ser `null` para algunas canciones
- [ ] Token de Spotify expira en 1 hora (no hay refresh automático)
- [ ] El reproductor no persiste entre recargas de la app
- [ ] No hay caché de imágenes implementado aún

---

## 🚧 Roadmap

### **v1.1**
- [ ] Implementar búsqueda de canciones
- [ ] Añadir favoritos/me gusta
- [ ] Historial de reproducción
- [ ] Cola de reproducción

### **v1.2**
- [ ] Modo offline con AsyncStorage
- [ ] Compartir canciones
- [ ] Sincronización con cuenta de Spotify real
- [ ] Estadísticas de escucha

### **v2.0**
- [ ] Backend propio para autenticación
- [ ] Subida de canciones personalizadas
- [ ] Playlists colaborativas
- [ ] Sistema de recomendaciones con IA

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- [Spotify](https://www.spotify.com/) por su increíble API
- [Expo](https://expo.dev/) por simplificar el desarrollo móvil
- Comunidad de React Native por su apoyo constante
- [NativeWind](https://www.nativewind.dev/) por traer Tailwind a React Native
- [Profe Milo](https://github.com/VGMil) por enseñarnos a programar :)

<div align="center">
  <p>Hecho con ❤️ y ☕ por la comunidad</p>
  <p>⭐ Si te gustó el proyecto, dale una estrella en GitHub!</p>
</div>
