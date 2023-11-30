# Blockchain B.A.T
## Documentacion
Esta documentacion va a estar dividida en dos partes:
1. [Contratos](#contratos)
   <br>
2. [implementacion](#implementacion)
## Contratos
Utilizando la el lenguaje de programacion de Solidity hemos creados tres contratos con los siguientes nombres:
- Route.sol
    - Diseñado para poder subir la informacion que esta enviando un camion al backend y tenerla toda en un contrato.
- Company.sol
    - Diseñado para emitir informacion de las companias a la blochain y almacenar rutas de la compania.
- Back.sol
  - Diseñado para almacenar tanto rutas como companias validas que previamente fueron emitidas de una address unica.

### Diagrama UML de los contratos
![Diagrama UML Contratos](Doc/Diagrama%20De%20Contratos.jpg)

### Observaciones
- Todos los contratos son seguros debido a que una vez emitidos el unico que los puede modificar es el que lo emitio.

## Implementacion
Utilizando el lenguaje de programacion de JavaScript creamos una interfaz para que el back-end pueda interactuar con los contratos. Fueron cinco los archivos que creamos:
- Global.js
    - Contiene dos funciones que sirven para conectarse a la red y para configurar la wallet.
- Back.js
    - Contiene las funciones necesarias para interactuar con el contrato back y otras funciones para hacer el proceso de crear companias, rutas, etc mas facil.
- Company.js
    - Contiene las funciones necesarias para interactuar con el contrato company.
- Route.js
    - Contiene las funciones necesarias para interactuar con el contrato route.
- testing.js
    - Es el archivo para testear los demas archivos.



