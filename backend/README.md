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
1. Ve a [Railway.app](https://railway.app) y crea una cuenta
2. Haz clic en "New Project" → "Deploy from GitHub repo"
3. Conecta tu repositorio: `m4rt1n1309/tfidefacultad`
4. Railway detectará automáticamente el directorio `backend`
5. Configura las variables de entorno:
   - `MONGODB_URI`: `mongodb+srv://ncrmr250253:dSmdxISCrJ7gpDC6@cluster0.7on3xbd.mongodb.net/oscarbarbieri`
   - `NODE_ENV`: `production`
6. Railway usará automáticamente `npm start` como comando de inicio

### MongoDB Atlas
Para producción, usa MongoDB Atlas:
1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un cluster gratuito
3. Obtén la URL de conexión
4. Configúrala como `MONGODB_URI` en tu servicio de hosting
