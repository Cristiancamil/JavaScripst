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


// Definicion de variables y constantes
let deck         = []; // Baraja
const tipos      = ['C','D','H','S']; // Tipos de cartas
const especiales = ['A','J','Q','K']; // Cartas especiales
let puntosJugador     = 0,
    puntosComputadora = 0;

//Referencias HTML
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const smalls = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

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
    deck = _.shuffle(deck)    
    
    return deck;
    
}
crearDeck();


// Esta función me permite tomar una carta de la baraja
const perdirCarta = () => {
    if (deck.length === 0) {
        throw'No hay carta en el deck';
    }
    let nuevoDeck = deck;
    let carta = nuevoDeck.pop();
    
    return nuevoDeck.pop();
}

// Obtener el valor de las cartas
const valorCarta = ( carta ) => {
    const valor = carta.substring(0,carta.length-1);
    
    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10 
            : parseInt(valor);

}

// Turno del jugador
const turnoJugador = () => {
    const carta = perdirCarta();     
    puntosJugador = puntosJugador + valorCarta(carta);

    smalls[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src   = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    return puntosJugador, divCartasJugador;
}

// Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {
    do {
        const carta = perdirCarta();     
        puntosComputadora = puntosComputadora + valorCarta(carta);

        smalls[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src   = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

    } while ((puntosComputadora < puntosMinimos) && (puntosComputadora <= 21));

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Empatados');
        } else if (puntosMinimos > 21) {
            alert('Computadora gana');
        } else if (puntosComputadora > 21) {
            alert('Jugador gana');
        } else {
            alert('Nadie gana')
        }
    }, 20);

    
    return puntosComputadora, divCartasComputadora; 

}

// Eventos
btnPedir.addEventListener('click', () => {
    turnoJugador();

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho perdiste!');
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugador)
    } else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    deck = [];

    puntosJugador     = 0;
    puntosComputadora = 0;

    smalls[0].innerText = '0';
    smalls[1].innerText = '0';

    divCartasComputadora.innerText = '';
    divCartasJugador.innerText     = '';

    btnDetener.disabled = false;
    btnPedir.disabled   = false;
});