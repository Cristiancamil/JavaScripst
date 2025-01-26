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

let deck         = []; // Baraja
const tipos      = ['C','D','H','S']; // Tipos de cartas
const especiales = ['A','J','Q','K']; // Cartas especiales
// const valorCartas = {'A': 1, 'J': 10, 'Q': 10, 'K': 10}

// Esta función crea un nuevo deck (baraja)
const crearDeck = () => {

    // Este for crea la secuencia de números desde el 2 hasta el número 10
    // El forOf anidado itera los tipos de cartas
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
           deck.push(i + tipo); // Se agrega al deck el número y el tipo de carta
        }
    }

    // Este forOf itera los tipos de cartas
    // El forOf anidado itera las cartas especiales
    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo); // Se agrega al deck el número y el tipo de carta
        }
    }
    
    // Shuffle se encarga de mezclar aleatoria los elementos de un array.
    return _.shuffle(deck)
    
}
crearDeck();


// Esta función me permite tomar una carta de la baraja
const perdirCarta = () => {
    if (deck.length === 0) {
        throw'No hay carta en el deck';
    }
    let nuevoDeck = deck;
    return nuevoDeck.pop();
}
const pedir = perdirCarta();


// Obtener el valor de las cartas
const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length-1);
    
    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10 
            : parseInt(valor);

}
const valor = valorCarta(pedir);
console.log(valor);
