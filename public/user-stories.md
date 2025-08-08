|**ID HU**|**Tipo**|**Descripcion**||
| - | - | - | :- |
|Tarea|Diseño|Diseño de arquitectura base, estructura de datos y endpoints||
|Tarea|Configuraicon ambientes|<p>Configuracion  herramientas</p><p></p><p></p><p></p><p></p>||
|US01|Autententicacion|Creacion pantalla autenticacion usuario y contraseña||
|US03|Entrenar modelo con el producto|Cargar informacion detallada del producto||
|Us04|Entrenar modelo con el producto|Actualizar información  del prodcuto||
|US05|Chatbot|Creación pantalla  interación chatbot||
|US06|Chatbot|Enviar la pregunta  del usuario al chatbot||
|Us07|Chatbot|Obtener respuesta  generada por la IA||



|**Responsable**|
| - |
||
|Crstian/David/Harly|
|Cristian|
|Harly / Laura|
|Harly / Laura|
|David|
|David|
|David|


|**Funcionalidad**||
| - | - |
|Autenticacion de usuarios||
|Entrenar modelo  con  informción del producto||
|Interfaz del chatbot con  envio  de pregunta y respueta de IA||


|Funcionalidad|Dia 1|Dia 2|Dia 3|
| - | - | - | - |
|Diseño defincion||||
|Alimentar el modelo con datos del producto||||
|Autenticacion||||
|Interfaz chat||||
|Validacion flujo completo||||
|||||


|Dia 4|Dia 5|
| - | - |
|||
|||
|||
|||
|||
|||

|**US01**|**Como cliente quiero iniciar sesion para acceder al chatbot**|||||||||||
| - | - | - | - | :- | :- | :- | :- | :- | :- | :- | :- |
|||||||||||||
|**Descripción**: Se requiere tener una pantalla de autenticación con usuario y contraseña, si los datos ingresados son correctos permite al usuario ingresar al chatbox en caso contrio genera los mensajes de error correspondientes||||||||||||
|**Beneficio:**Protección de datos evita que tercers accedan a información sensible, mejora la precisión en las respuestas|Es el punto de partida para una experinecia segura y protección de datos|||||||||||
||Reduce el riesgo  de usuarios maliciosos  que saturen el sistema con consultas erradas|||||||||||
|**CRITERIOS DE ACEPTACIÖN**||||||||||||
|Validar muestre una pantalla como se ve en la imagen con los campos usuario y contraseña  y un botón   Ingresar   cuando   muestra la pantalla de autenticación||||||||||||
|||||||||||||
|||||||||||||
|Mockup:||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|Validar permita al usuario crear un cuenta y muestra la pantalla como se ve en  la imagen   cuando  no esta registrado el  usuario||||||||||||
|||||||||||||
|Mocku||||||||||||
|||||||||||||
|||||||||||||


|||||||||||||
| - | - | - | - | - | - | - | - | - | :- | :- | :- |
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|||||||||||||
|Validar se muestre la constraseña enmascarada con asteriscos(\*)  cuando el usuario esta digitando  la información||||||||||||
|Validar muestre mensaje "El usuario no existe o las contraseñas son inválidas"  cuando el usuario   o contraseña ingresado no corresponde con los usuarios registrados||||||||||||
|Validar muestre mensaje " Su usuario se encuentra inactivo , contactese con soporte " cuando el usuario  y contraseña son correctos pero esta marcado como inactivo||||||||||||
|Validar se muestre el mensaje de obligatoriedad en cada uno de los campos cuando se da clic en Iniciar Sesión  y no se ha ingresado información en  los o alguno de los campos||||||||||||
|Validar  permita el ingreso  y redirija al usuario a la pantalla del chat  cuando el usuario y la contraseña son validos||||||||||||
|<p>Valisar se mapee los siguientes  endpoint  GET /users/login , POST /users/logout,</p><p>POST /users/register cuando se realiza la autenticación</p>||||||||||||


||||||||||
| - | - | - | - | - | - | - | - | - |
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||


||||||||||
| - | - | - | - | - | - | - | - | - |
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||


||||
| - | - | - |
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||

|**US05  Como usuario requiero  tener una pantalla  para realizar las consultas al bot y recibir las respuestas**|||
| - | :- | :- |
|**Descripción**: Se requiere tener una pantalla donde el usuario pueda interactuar con el chat bot , para que realizarle preguntas del producto y obtener las respuetas de la IA|||
|**Beneficio**|||
||||
||||
|**CRITERIOS DE ACEPTACIÓN**|||
|Validar al autenticarse  el  usuario exitosamente  se visualice  la pantalla del chatbot como se ve en la imagen , el campo se encuentre activo**y el botón enviar deshabilitado**|||
|**Validar el chatbot ocupe un tercio de la pantalla  y se muestre centrado**|||
|![](data:image/png;base64,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)|||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
||||
|Validar permita ingresar caracteres alfanuméricos y caractes especiales en el campo de entrada|||



|||
| - | :- |
|Validar  la opción Enviar  se muestre habilitado solo si hay texto  en el campo  "Preguntame sobre finanzas personales"||
|Validar se conserve el historial de la conversación si el usuario recarga la pantalla||
|Validar se  muestre el scroll vertical  para poder consultar el historial||
|Validar muestre opción de Cerrar Sesión y al seleccionarlo regrese a la pantalla de autenticación||



||||||||||
| - | - | - | - | - | - | - | - | - |
||||||||||
|El usuario puede ver  sus preguntas y respuestas anteriores, lo que facilita la conversación|||||||||
|Ayuda a evitar repeticiones innecesarias|||||||||
|Mejora confianza del usuario al recibir retroalimentación inmnediata|||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||


||||||||||
| - | - | - | - | - | - | - | - | - |
||||||||||
||||||||||
||||||||||
||||||||||

|**US06**|Como cliente requiero enviar mensajes al chatbot  para resolver dudas||||||||||
| - | - | - | :- | :- | :- | :- | :- | :- | :- | :- |
|Descripción: Al estar el usuario autenticado y en la ptanla de interaccipon con el chatbos, el usuario puede enviar las preguntas al bot acerca del producto para el cual esta entrenado|||||||||||
|Beneficios:|El bot puede resolver preguntas  frecuentes  sin la intervencion humana||||||||||
||Reduce tiempos en resolver las dudas a cerca del producto||||||||||
||El usuario puede interactuar en cualquier momento||||||||||
||Puede atender multiples conversaciones||||||||||
||||||||||||
|**CRITERIOS DE ACEPTACIÓN**|||||||||||
|Vali dar permita redactar pregunta en texto libre con validación ongitud máxima de 500 caracteres|||||||||||
|<p>Validar al seleccionar la opción de Enviar , el mensahe se  transmita correctamente  , se envíe  un post con /chat como endpoint</p><p>Y / logout</p>|||||||||||
|Validar el usuario vea su mensaje reflejado en la pantalla  del chat inmediatamente despues de enviado|||||||||||
|Validar no se  habilite la opción Enviar  cuando el campo de ingreso del texto está vacio|||||||||||
|Validar cada mensaje enviado quede asociado al usuario  autenticado  y se almacene para el historial|||||||||||



||||||||||
| - | - | - | - | - | - | - | - | - |
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||

|**US07**|Como cliente requiero recibir respuestas claras  generada por la IA  a la pregunta dada||||||||||||
| - | - | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
|Descripción:|El usuario una vez enviada la pregunta el chatbot por medio de la IA envia la respuesta al usuario de acuerdo a los datos alinentdos al modelo||||||||||||
|Beneficios|El usuario siente que el chatbot “entiende” su necesidad y responde con precisión.||||||||||||
||Al recibir respuestas útiles desde el primer intento, se minimiza la necesidad de repetir preguntas o contactar a un agente humano.||||||||||||
||||||||||||||
|**CRITERIOS DE ACEPTACIÓN**|||||||||||||
||||||||||||||
|Validar el sistema  entregue  una respuesta del chatbot inmediatamente después de recibir una pregunta|||||||||||||
|Validar la respuesta se muestra en la pantalla de chat con estilo diferenciado ( color, ícono del bot)|||||||||||||
|Validar  si la respusta excede limite de XXX ,se muestre paginada o dividir en partes para facilitar la lectura.|||||||||||||
|Validar muestre mensaje "Lo siento, no puedo procesar tu solicitud, reformula la pregunta"v cuando  el chatbot no puede generar la respuesta sea porque la pregunta no es del producto|||||||||||||
|Validar cada respuesta quede  registrada y asociada al usuario para temas de histórico|||||||||||||
|Validar muestre el historial cuando se recarga la página|||||||||||||


|||||||||
| - | - | - | - | - | - | - | - |
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||
|||||||||

|**US03**|**Como  admnistrador requiero se cargue el archivo Chatbot-Finanzas-Personales  con la informacion detallada del producto para  que el bot pueda responder**|||||||||||||
| - | - | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- | :- |
|||||||||||||||
|Beneficios: El modelo podrá responder con base en contenido específico del producto, evitando ambigüedades o respuestas genéricas.||||||||||||||
||Al tener la información embebida, el chatbot responde de forma inmediata|||||||||||||
|||||||||||||||
|**CRITERIOS DE ACETACIÓN**||||||||||||||
|Validar que se cargue el archivo json con  el contenido de  finanzar personales con el que se va a alimentar el modelo||||||||||||||
|Validar el contenido cargado debe ser procesado y convertido en  vectores numéricas (embeddings) para que el modelo pueda entenderlo.||||||||||||||
|Validar  Los vectores deben guardarse en una base de datos accesible por el chatbot en tiempo de consulta.||||||||||||||



||||||||||
| - | - | - | - | - | - | - | - | - |
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||
||||||||||

