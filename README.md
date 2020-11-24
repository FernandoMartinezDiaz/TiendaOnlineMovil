<img src="assets/LOGOnet504MOVIL1.png">

# TiendaOnlineMovil 
Esta es una Aplicacion que se conecta a la API de  Productos de Amazon la cual se encuentra en  rapidapi.com  la cual muestra información sobre los porductos que estan en oferta ,permite hacer búsquedas y dar la informacion total del producto.

## Tecnologías utilizadas

- React native
- Expo
- React navigation
- NativeBase
- Axios

## Instrucciones para la instalación

Clona este repositorio. Necesitas tener instalado <code>node</code>, <code>npm</code> y <code>expo-cli</code> de manera global en tu computadora.

Amazon Products API key: <br>
Para que la aplicación pueda funcionar, requieres de una API key válida para poder comunicarte con la API de Amazon Products. Tienes que registrarte en rapiApi y posteriormente suscribirte a la API de Amazon Products para asi poder tener acceso a los diferentes EndPoints.

Una vez que obtengas tu API key, debes crear el archivo <code>enviroments.js</code> en la raíz del directorio y configurarlo de la siguiente manera:
<br>
<br>

```js
import Constants from "expo-constants";

const ENV = {
    dev: {
        apiUrl: "https://amazon-products1.p.rapidapi.com/",
        apiKey: "Tu Api Key obtenida en : rapiApi.com",
        apiHost:"amazon-products1.p.rapidapi.com",
        apiImageUrl:"https://images-na.ssl-images-amazon.com/images/I/",
        apiUrlSearch: "https://m.media-amazon.com/images/I/",
        useQuery: "true" 
    },
};

const getEnvVars = (env = Constants.manifest.realeaseChannel) => {

    if (__DEV__) {
        return ENV.dev;
    }
};

export default getEnvVars;

```
<br>

Instalación:<br>
<code>npm install</code>

Iniciar Expo Metro:<br>
<code>expo start</code>
