/* La palabra reservada this hace referencia al mismo objeto, permite tomar los métodos, variables o constantes del mismo objeto.*/

const fher = {
    nombre: 'Fernando',
    edad: 30,
    imprimir() {
        console.log(`Nombre: ${this.nombre} - Edad: ${this.edad}`);
    }
}

const pedro = {
    nombre: 'Pedro',
    edad: 20,
    imprimir() {
        console.log(`Nombre: ${this.nombre} - Edad: ${this.edad}`);
    }
}


/* Si se tuvieran muchas personas seria un objeto por persona y no es practico, ni es una buena manera de hacerlo, para ello podemos usar una función de instancia. */
 function Persona(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
    this.imprimir = function() {
        console.log(`Nombre: ${ this.nombre } - Edad: ${ this.edad }`);
    }
 }



const maria   = new Persona('Maria', 20);
const mariana = new Persona('Mariana', 28);

maria.imprimir();
mariana.imprimir();