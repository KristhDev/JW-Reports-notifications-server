<h1 align="center">JW Reports Notifications Server</h1>

<br>

Este es más que todo una **tarea programada para enviar push notifications** a los usuarios que tengan una **sesión
activa** en la aplicación de JW Reports. Esas notificaciones son para **recordar la entrega del informe, las
revisitas y cursos bíblicos.**

Este es un pequeño documento que explica las tecnologías, entorno de desarrollo y cómo correr esta aplicación.

## 1) Tecnologías

### 1.1) Node Cron
Es un **pequeño programador de tareas** en JavaScript puro para node.js **basado en GNU crontab.** Este módulo le permite
programar tareas en node.js utilizando la **sintaxis crontab completa.**

### 1.2) Typescript
Es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un **superconjunto 
de JavaScript**, que esencialmente añade tipos estáticos y objetos basados en clases. **Extiende la sintaxis de JavaScript**,
por tanto, cualquier código JavaScript existente debería funcionar sin problemas.

### 1.3) Supabase
Es una **alternativa de Firebase de código abierto.** Una **plataforma de bases de datos en la nube** que combina la
simplicidad y la accesibilidad de una **herramienta de gestión de bases de datos** no relacionales con la potencia y
la escalabilidad de una base de datos relacional.

Supabase es una opción popular para desarrolladores y empresas que buscan una solución de bases de datos en la nube para
sus aplicaciones y proyectos.

### 1.4) OneSignal
Es una **plataforma de mensajería y automatización de notificaciones push** para sitios web y aplicaciones móviles. Permite a
los desarrolladores y propietarios de sitios web **enviar notificaciones push personalizadas y automatizadas** a los usuarios en
tiempo real.

### 1.5) Enlaces
 * [Node Cron](https://github.com/node-cron/node-cron)  
 * [TypeScript](https://www.typescriptlang.org)  
 * [Supabase](https://supabase.com)  
 * [OneSignal](https://onesignal.com)

<br>

## 2) Entorno de desarrollo

Para montar el entorno de desarrollo y correr la aplicación se necesitan los siguientes programas:

### 2.1) Node.js
Es un **entorno en tiempo de ejecución multiplataforma para la capa del servidor** (en el lado del servidor) basado en 
JavaScript. Controlado por eventos, diseñado para crear aplicaciones escalables, permitiéndote establecer y gestionar 
múltiples conexiones al mismo tiempo. Gracias a esta característica, no tienes que preocuparte con el bloqueo de procesos, 
pues no hay bloqueos.

Node.js está **basado en el motor V8 de Google**, uno de los intérpretes de lenguaje de programación que existen. Este 
motor se encarga de compilar el código JavaScript en código de máquina, un código de nivel más bajo que no hace falta 
que sea interpretado por el navegador.

### 2.2) Pnpm (opcional)
Es un **gestor de paquetes de JavaScript** para aplicaciones web y Node.js. Es una **alternativa a npm y yarn,** dos de los gestores 
de paquetes más populares de la industria.

Pnpm se destaca por su **enfoque en el rendimiento y la eficiencia.** En lugar de descargar cada paquete en el directorio de
node_modules de cada proyecto, pnpm **utiliza un único almacén central para todos los paquetes instalados en un sistema,** lo 
que significa que los paquetes se descargan una sola vez y se comparten entre los diferentes proyectos. Esto **reduce el tamaño 
de los proyectos y acelera el proceso de instalación** de paquetes.

### 2.3) Enlaces
 * [Node.js](https://nodejs.org)
 * [Pnpm](https://pnpm.io/es)

<br>

## 3) Correr en desarrollo
A partir de aquí se explicará cómo levantar el servidor en desarrollo:

### 3.1) Clonar respositorio
Lo primero es clonar el repositorio de git, para ello **abre una terminal** (cmd, powershell, gitbash, etc.) y escribe el 
siguiente comando:

```
git clone https://github.com/KristhDev/JW-Reports-notifications-server.git
```

### 3.2) Variables de entorno
En el repositorio está un **archivo de ejemplo de variables de entorno** `.env.example`. Copia ese archivo y renómbralo 
cómo `.env`. Luego **reemplaza los valores por los que da Supabase y OneSignal.** Recuerda que para ello ya **debes tener una cuenta** en Supabase y haber **creado un proyecto**, además de haber **creado una cuenta en OneSignal** y haber configurado
la parte de las **notificaciones en Android.**

| SUPABASE_APY_KEY | SUPABASE_URL | ONESIGNAL_APP_ID | ONESIGNAL_REST_API_KEY |
|------------------|--------------|------------------|------------------------|
| Es la clave para hacer las operaciones necesarias con un proyecto de Supabase | Es la url del proyecto de Supabase | ID de la aplicación de OneSignal | Es la clave para usar la rest api de OneSignal |

### 3.3) Instalar dependencias
Una vez clonado y con las variables de entorno, has un ```cd``` a la **raíz del proyecto** y ejecuta el siguiente comando:
```
pnpm install
``` 
<br>

En el punto anterior se mencionó que **pnpm es opcional**, puedes usar el gestor que desees, sea ```npm``` o ```yarn```, si 
vas a cambiar pnpm asegúrate de borrar el archivo ```pnpm-lock.yaml```

Si usas npm:
```
npm install
```

Si usas yarn:
```
yarn install
```

### 3.4) Correr aplicación
Una vez instaladas las dependencias, ejecuta el siguiente comando:

Si usas pnpm:
```
pnpm start
```

Si usas yarn:
```
yarn start
``` 

Si usas npm:
```
npm start
```

<br>

Y listo, la aplicación ya estará corriendo localmente. Las tareas se **ejecutarán cada 24 horas a las 6:00 AM,** puedes
cambiar la frecuencia de ejecución el archivo `index.ts`.

<br>

___

Para más información contactar a kristhdev@gmail.com

