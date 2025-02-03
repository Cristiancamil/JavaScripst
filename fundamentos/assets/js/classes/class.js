/*
  *  Las clases siempre se nombran con la primera letra en mayuscula.
  *  Estructura de una clase:
    *   atributos: Son variables propias de las clases, tambien se conocen como atributos o campos, se utilizan para almacenar datos especificos
                   de cada instancia de la clase.
    *   constructor: Es un método que llama automáticamente cuando se crea una nueva instancia de la clase y permiten establecer valores iniciales
                     para los atributos del objeto.
    *   Métodos get: Obtienen el valor de un atributo de la clase, permiten acceder a estos atributos de manera controlada, lo que permite incluir 
                     validaciones o transformaciones antes de devolver el valor.
    *   Métodos set: Establecen o modifican el valor de un atributo de la clase, permiten validar o transformar los datos antes de ser asignados al
                     atributo, asegurando que el objeto mantenga un valor valido.
*/


class Persona {
    nombre = '';
    codigo = '';
    frase  = '';
    _comida = '';

    //Construye el objeto de la clase.
    constructor (nombre = 'Sin nombre', codigo = 'Sin código', frase = 'Sin frase') {

        this.nombre = nombre;
        this.codigo = codigo;
        this.frase  = frase;
    }

    // Establecen valores
    set setComidaFavorita( comida ) {
        this._comida = comida.toUpperCase();
    }

    // Obtienen valores
    get getComidaFavorita() {
        return `La comida favorita de ${this.nombre} es ${this._comida}`;
    }

    //Method quienSoy
    quienSoy() {
        console.log(`Soy ${this.nombre}`);
    }

    //Method miFrase
    miFrase() {
        console.log(`${this.codigo} dice ${this.frase}`)
    }
}

const spiderman = new Persona( 'Peter Parker', 'SpiderMan', 'Soy tu buen amigo el hombre araña.' );
spiderman.quienSoy()
spiderman.miFrase()
spiderman.setComidaFavorita = 'El pie de cereza de la tia May';
console.log(spiderman.getComidaFavorita);
console.log(spiderman);