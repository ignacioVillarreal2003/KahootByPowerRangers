# ProyectoDWM - Obligatorio Desarrollo Web y Mobile

## Desarrollo
Se requiere un juego estilo Kahoot implementando un software web y mobile que les permita proponer juegos/chistes/imágenes para reuniones sociales o fiestas (actividades).
A continuación se explicarán los detalles de cómo debería funcionar la aplicación:

-	Creación del juego: El anfitrión deberá crear una sala de juego con una propuesta, código único y un link para que los jugadores puedan ingresar a la sala. 
-	Creación de propuestas: El anfitrión deberá crear una propuesta a partir de un conjunto de actividades que se encuentran en el sistema, para mostrar al resto de los jugadores. 
-	Creación de actividades: El anfitrión podrá crear una nueva actividad, para ser agregada a futuras propuestas. La actividad contiene un titulo, una descripción y opcionalmente una imagen.
-	Preparación: Para jugar será necesaria una pantalla grande (como televisión o computadora) para mostrar la interfaz del juego a todos los jugadores. Cada jugador debe tener su propio dispositivo móvil con acceso a un navegador web.
-	Conexión a la sala de juego: El anfitrión inicia una sala de juego y comparte un código único y/o link, para que los jugadores puedan ingresar desde sus dispositivos mobile para unirse a la partida.
-	Jugabilidad: Una vez que el anfitrion decida (mediante un boton en la interfaz), el juego comienza. La propuesta creada por el anfitrión será presentada en la pantalla principal con sus respectivas actividades. Cada actividad se muestra de manera única en la pantalla del jugador, las cuales iran pasando de una en una. En ningun momento los jugadores pueden todas las actividades juntas, solamente al mostrar los resultados. Al momento de presentar la actividad, las opciones de votación serán: 
	>- Me gusta (+1)
	>- No me gusta (-1)
	>- Me da igual (0)
- Luego de pasadas todas las actividades, se mostrarán en la pantalla grande los resultados, contabilizando los votos de las 3 más votadas.

## Tecnologias usadas y componentes importantes
- JWT
- Socket.io
- Middleware e interceptor
- Bcrypt
- Express (webapi desarrollada en Node JS)
- Angular
- MongoDB

## Instalacion
- Clonar el Repositorio
- Instalar Dependencias Frontend: cd ... && npm install
- Instalar Dependencias Backend: cd ... && npm install
- Iniciar Aplicación Frontend: cd ... && ng serve --open
- Iniciar Servidor Backend: cd ... && npm run dev

La aplicación estará disponible en http://localhost:4200, y el servidor backend en http://localhost:3000. Corre localmente. 
Puede habrir varias pestañas para utilizarla.

