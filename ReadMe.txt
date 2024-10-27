UBICACIÓN

La API está disponible en: http://localhost:3000/api/v1

COLECCIONES:
/birds
/reserves
/users

USUARIOS

El resgistro de nuevos usuarios es libre:
Los datos requeridos son un apodo (que será único para cada usuario) y una contraseña.
nickname:
password:
POST /signup

Una vez registrado un usuario tendrá acceso a más funcionalidades de la base de datos, para entrar es necesario usar el apodo y la contraseñas que se utilizaron en el registro.
nickname:
password:
POST /login

Una vez el usuario esté logado, podrá visitar su propio perfil a través de su propia id:
GET /:id

Salvo la condición (rol), el usuario podrá modificar los datos de su perfil:
PUT /changeProfile/:id

Finalmente el usuario podrá borrar su perfil de la base de datos:
DELETE /deleteOwnUser/:id

USUARIOS: FUNCIONALIDADES SOLO DE ADMINISTRADOR

El administrador tendrá acceso a los perfiles de los usuarios registrados:
GET /allUsers
O también al perfil de un usuario determinado a través de la id:
GET /allUsers/:id

El administrador podrá modificar el perfil de cualquier usuario incluyendo las posibilidad de cambiar la condición o rol de un usuario de colaborador a administrador:
PUT /modifyUser/:id

El administrador puede borrar a cualquier usuario de la base de datos:
DELETE /deleteAnyUser/:id


PÁJAROS

La búsqueda de todos los pájaros de la base de datos la pueden hacer tanto los usuarios logados como los no logados. En esta búsqueda solo aparecerán los pájaros verificados por el administrador:
GET /

También se podrán buscar, de forma libre, los pájaros según su dieta o hábtitat:
GET /alimentacion?alimentacion=:tipo_de_alimento
Tipo de alimentos válidos: "insectos", "peces", "anfibios", "carroña", "mamíferos", "aves", "frutas", "semillas", "lombrices", "crustáceos"

GET /habitat/:habitat 
Habitats válidos: "bosque", "praderas", "humedales", "marismas", "montañas", "estuarios", "llanuras", "acantilados","área urbana", "semiáridas", "costa", "desierto"

Solo los usuarios dados de alta y logados podrán sugerir la inclusión de nuevos pájaros debiendo indicar la reserva donde han avistado al pájaro y completando las partes del esquema. Estos pájaros deberán ser verificados por el administrador y hasta entonces permanecerán ocultos a los usuarios:
POST /:id_reseva

imagen: (obligatorio),
nombre_comun: (obligatorio),
nombre_cientifico: (obligatorio),
alimentacion: (obligatorio), solo son válidos: "insectos", "peces", "anfibios", "carroña", "mamíferos", "aves", "frutas", "semillas", "lombrices", "crustáceos",
migratoria: (obligatorio),
habitat: (obligatorio), solo son válidos: "bosque", "praderas", "humedales", "marismas", "montañas", "estuarios", "llanuras", "acantilados","área urbana", "semiáridas", "costa", "desierto"

Los usuarios dados registrados y logados podrán sugerir la modificación de los datos de un pájaro, esta sugerencia quedará pendiente de verificación por parte del administrador no siendo visible hasta ser verificada:
PUT /:id_pajaro

PÁJAROS: FUNCIONALIDADES SOLO ADMINISTRADOR

El administrador podrá ver todos los pájaros, tanto verificados como no verificados.
GET /admin

El administrador podrá crear un registro con un pájaro nuevo siguiendo el modelo previsto y quedando el pájaro ya en estado verficado:
POST /:id_reserva/admin

El administrados podrá dar por buena y verificada la sugerencia de publicación de un nuevo pájaro por parte de un usuario en la base de datos:
PUT /verify/:id_pajaro

Solamente el administrador podrá borrar un pájaro publicado en la base de datos:
DELETE /:id_pajaro


RESERVAS DE AVES

Cualquiera podrá buscar las reservas de aves sin necesidad de registrarse:
GET /

También cualquiera podrá filtrar la búsqueda de las reservas de aves por tipo de terreno:
GET /reserves/terreno?terreno=tipo_de_terreno

RESERVAS DE AVES: FUNCIONALIDADES SOLO PARA EL ADMINISTRADOR

Solo el administrador tendría la facultad de incluir una nueva reserva de aves en la base de datos:
POST /

Del mismo modo, solo el administrador podrá actualizar cualquier dato de las reservas de aves:
PUT /:id_reserva

Solo el administrador podrá borrar una reserva de aves de la base de datos:
DELETE /:id_reserva

El administrador es el único que puede borrar a un pájaro que se haya incluido erróneamente como residente en una reserva:
DELETE /id_reserva/bird/:id_pajaro