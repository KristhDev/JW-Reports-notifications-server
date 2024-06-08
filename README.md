<h1 align="center">JW Reports Notifications Server</h1>

<p align="center">
  <a href="https://creativecommons.org/licenses/by/4.0">
    <img alt="License: Attribution 4.0 International" src="https://img.shields.io/badge/License-Attribution%204.0%20International-blue.svg" />
  </a>
  <a href="https://github.com/KristhDev/ReactTasks-backend/releases/tag/v2.1.2">
    <img alt="Api Version" src="https://img.shields.io/badge/Version-%202.1.2%20-brightgreen.svg" />
  </a>
</p>

<br>

## Indice
- [1. Tecnologías](#1-tecnologias)
  - [1.1. Express](#1.1.-express)
  - [1.2. Typescript](#1.2.-typescript)
  - [1.3. Supabase](#1.3.-supabase)
  - [1.4. OneSignal](#1.4.-onesignal)
  - [1.5. Enlaces](#1.5.-enlaces)
- [2. Entorno de desarrollo](#2-entorno-de-desarrollo)
  - [2.1. Node.js](#2.1.-nodejs)
  - [2.2. Pnpm (opcional](#2.2.-pnpm-opcional)
  - [2.3. Enlaces](#2.3.-enlaces)
- [3. Correr en desarrrollo](#3-correr-en-desarrollo)
  - [3.1. Clonar repositorio](#3.1.-clonar-repositorio)
  - [3.2. Variables de entorno](#3.2.-variables-de-entorno)
  - [3.3. Instalar dependencias](#3.3.-instalar-dependencias)
  - [3.4. Correr aplicación](#3.4.-correr-aplicacion)
  - [3.5. Ejecutar tareas](#3.5.-ejecutar-tareas)

Este es más que todo un **microservicio para enviar push notifications** a los usuarios que tengan una **sesión
activa** en la aplicación de JW Reports. Esas notificaciones son para **recordar la entrega del informe, las
revisitas y cursos bíblicos.**

Este es un pequeño documento que explica las tecnologías, entorno de desarrollo y cómo correr esta aplicación.

<a name="1-tecnologias"></a>
## 1. Tecnologías

<a name="1.1.-express"></a>
### 1.1. Express
Es un **popular framework de aplicaciones web para Node.js**, que se utiliza para crear aplicaciones web y servicios web
basados en el protocolo HTTP. Express es una **capa delgada sobre Node.js y proporciona una amplia gama de características**
para la creación rápida y fácil de aplicaciones web robustas.

<a name="1.2.-typescript"></a>
### 1.2. Typescript
Es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un **superconjunto 
de JavaScript**, que esencialmente añade tipos estáticos y objetos basados en clases. **Extiende la sintaxis de JavaScript**,
por tanto, cualquier código JavaScript existente debería funcionar sin problemas.

<a name="1.3.-supabase"></a>
### 1.3. Supabase
Es una **alternativa de Firebase de código abierto.** Una **plataforma de bases de datos en la nube** que combina la
simplicidad y la accesibilidad de una **herramienta de gestión de bases de datos** no relacionales con la potencia y
la escalabilidad de una base de datos relacional.

Supabase es una opción popular para desarrolladores y empresas que buscan una solución de bases de datos en la nube para
sus aplicaciones y proyectos.

<a name="1.4.-onesignal"></a>
### 1.4. OneSignal
Es una **plataforma de mensajería y automatización de notificaciones push** para sitios web y aplicaciones móviles. Permite a
los desarrolladores y propietarios de sitios web **enviar notificaciones push personalizadas y automatizadas** a los usuarios en
tiempo real.

<a name="1.5.-enlaces"></a>
### 1.5. Enlaces
 * [Express](https://expressjs.com)  
 * [TypeScript](https://www.typescriptlang.org)  
 * [Supabase](https://supabase.com)  
 * [OneSignal](https://onesignal.com)

<br>

<a name="2-entorno-de-desarrollo"></a>
## 2. Entorno de desarrollo

Para montar el entorno de desarrollo y correr la aplicación se necesitan los siguientes programas:

<a name="2.1.-nodejs"></a>
### 2.1. Node.js
Es un **entorno en tiempo de ejecución multiplataforma para la capa del servidor** (en el lado del servidor) basado en 
JavaScript. Controlado por eventos, diseñado para crear aplicaciones escalables, permitiéndote establecer y gestionar 
múltiples conexiones al mismo tiempo. Gracias a esta característica, no tienes que preocuparte con el bloqueo de procesos, 
pues no hay bloqueos.

Node.js está **basado en el motor V8 de Google**, uno de los intérpretes de lenguaje de programación que existen. Este 
motor se encarga de compilar el código JavaScript en código de máquina, un código de nivel más bajo que no hace falta 
que sea interpretado por el navegador.

<a name="2.2.-pnpm-opcional"></a>
### 2.2. Pnpm (opcional)
Es un **gestor de paquetes de JavaScript** para aplicaciones web y Node.js. Es una **alternativa a npm y yarn,** dos de los gestores 
de paquetes más populares de la industria.

Pnpm se destaca por su **enfoque en el rendimiento y la eficiencia.** En lugar de descargar cada paquete en el directorio de
node_modules de cada proyecto, pnpm **utiliza un único almacén central para todos los paquetes instalados en un sistema,** lo 
que significa que los paquetes se descargan una sola vez y se comparten entre los diferentes proyectos. Esto **reduce el tamaño 
de los proyectos y acelera el proceso de instalación** de paquetes.

<a name="2.3.-enlaces"></a>
### 2.3. Enlaces
 * [Node.js](https://nodejs.org)
 * [Pnpm](https://pnpm.io/es)

<br>

<a name="3-correr-en-desarrollo"></a>
## 3. Correr en desarrollo
A partir de aquí se explicará cómo levantar el servidor en desarrollo:

<a name="3.1.-clonar-repositorio"></a>
### 3.1. Clonar repositorio
Lo primero es clonar el repositorio de git, para ello **abre una terminal** (cmd, powershell, gitbash, etc.) y escribe el 
siguiente comando:

```shell
git clone https://github.com/KristhDev/JW-Reports-notifications-server.git
```

<a name="3.2.-variables-de-entorno"></a>
### 3.2. Variables de entorno
En el repositorio está un **archivo de ejemplo de variables de entorno** `.env.example`. Copia ese archivo y renómbralo 
cómo `.env`. Luego **reemplaza los valores por los que da Supabase, OneSignal y Logtail.** Recuerda que para ello ya **debes tener una cuenta** en Supabase y haber **creado un proyecto**, además de haber **creado una cuenta en OneSignal** y haber configurado
la parte de las **notificaciones en Android.**

| ACCESS_TOKEN | SUPABASE_APY_KEY | SUPABASE_URL | ONESIGNAL_APP_ID | ONESIGNAL_REST_API_KEY | PORT |
|--------------|------------------|--------------|------------------|------------------------|------|
| Cadena de acceso para realizar las peticiones | Es la clave para hacer las operaciones necesarias con un proyecto de Supabase | Es la url del proyecto de Supabase | ID de la aplicación de OneSignal | Es la clave para usar la rest api de OneSignal | Es el puerto donde estará corriendo el servidor |

<a name="3.3.-instalar-dependencias"></a>
### 3.3. Instalar dependencias
Una vez clonado y con las variables de entorno, has un ```cd``` a la **raíz del proyecto** y ejecuta el siguiente comando:
```shell
pnpm install
```

<a name="3.4.-correr-aplicacion"></a>
### 3.4. Correr aplicación
Una vez instaladas las dependencias, ejecuta el siguiente comando:

```shell
pnpm start
```

Y listo, la aplicación ya estará corriendo localmente.

<a name="3.5.-ejecutar-tareas"></a>
### 3.5. Ejecutar tareas
La **primera versión de este server** usaba un **cron job** para enviar las notificaciones, pero se opto por otra opción, por un
**servidor rest** que al llamar un endpoint se envien las notificaciones.

Para enviar esas notificaciones solo se necesita llamar al siguiente endpoint:

```shell
GET /api/notifications/daily
```

Luego está otro endpoint para enviar notificaciones de actualizaciones:

```shell
POST /api/notifications/new-version
```

Está petición necesita los el siguiente body:

```json
{
    "version": "La nueva versión de la aplicación",
    "lauchUrl": "La url de descarga de la nueva versión de la aplicación"
}
```

<br>

A estos endpoints se le debe enviar el **header** de ```Authorization Berear``` para
aceptar la petición:

```json
{
    "headers": {
        "Authorization": "Bearer { ACCESS_TOKEN }"
    }
}
```

Estos endpoints regresan un json con dos propiedades:

```json
{
    "msg": "Mensaje del estado de la petición",
    "status": "Código de la respuesta"
}
```

<br>

___

Para más información contactar a kristhdev@gmail.com

