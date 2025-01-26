/**
 * 2C = Two Clubs
 * 2D = Two Diaminds
 * 2H = Two Hearts
 * 2S = Two Spades
 * 
 * ¿Cuando usar un bucle for y cuando utilizar los distintos bucles for que existen ?
 * For tradicional: Se utiliza cuando conoces el número exacto de iteraciones que necesitas. Es muy flexible y puede iterar sobre cualquier tipo de datos.
    Ejemplo:
  
        for (let i = 0; i < 5; i++) {
            console.log(i);
        }
 * 
 * ForEach: Se utiliza para iterar sobre los elementos de un array. Es más legible y evita errores comunes del bucle for tradicional.
    Ejemplo:
      
        let array = [1, 2, 3, 4, 5];
        array.forEach(function(elemento) {
            console.log(elemento);
        });
 *
 * For...in: Se utiliza para iterar sobre las propiedades enumerables de un objeto. No se recomienda para iterar sobre arrays porque puede incluir propiedades heredadas.
    Ejemplo:

        let objeto = {a: 1, b: 2, c: 3};
        for (let clave in objeto) {
            console.log(clave + ": " + objeto[clave]);
        }
 * For...of: Se utiliza para iterar sobre objetos iterables (arrays, strings, mapas, conjuntos, etc.). Es más adecuado para arrays que for...in.
    Ejemplo:

        let array = [1, 2, 3, 4, 5];
        for (let valor of array) {
            console.log(valor);
        }
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
           deck.push(i + tipo);
        }
    }


    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    
    deck = _.shuffle(deck)
    console.log(deck);

    return deck;
    
}

crearDeck();