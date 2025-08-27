# Backend TFIdeSistemas

## Configuración

### 1. Variables de Entorno
Crea un archivo `.env` en la raíz del backend con:

```
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/oscarbarbieri
```

### 2. MongoDB Local
Asegúrate de tener MongoDB instalado y ejecutándose localmente.

### 3. Instalación
```bash
npm install
```

### 4. Ejecutar
```bash
npm start
```

## Deploy

### Railway (Recomendado)
1. Conecta tu repositorio a Railway
2. Configura las variables de entorno:
   - `MONGODB_URI`: URL de tu cluster de MongoDB Atlas
   - `NODE_ENV`: production
3. Railway detectará automáticamente el comando de inicio

### MongoDB Atlas
Para producción, usa MongoDB Atlas:
1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un cluster gratuito
3. Obtén la URL de conexión
4. Configúrala como `MONGODB_URI` en tu servicio de hosting
