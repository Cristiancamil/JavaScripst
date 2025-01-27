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

 * ¿Qué es el patrón módulo?
 * Conocido también como funciones auto invocadas, no requieren que se les asigne un nombre y almacena la información en momoria, es dificil
 * acceder a esta información ya que no tiene un identificador.
 * Ejemplo:
 
    (() => {
        'use strict' se utiliza para decirle a JS que analice y ejecute el código de forma estricta, si hay variables no declaradas arroja un error.
    })()
*/

(() => {
    'use strict'

    // Definicion de variables y constantes
    let deck         = [];
    const tipos      = ['C','D','H','S'], 
          especiales = ['A','J','Q','K'];

    let puntosJugadores     = [];


    //Referencias HTML
    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small'); 


    // Esta función inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0)
        } 

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');

        btnDetener.disabled = false;
        btnPedir.disabled   = false;
    }

    // Esta función crea un nuevo deck (baraja)
    const crearDeck = () => {

        // Este for crea la secuencia de números desde el 2 hasta el número 10
        // El forOf anidado itera los tipos de cartas
        deck = [];
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
        return _.shuffle(deck);
        
    }

    // Esta función me permite tomar una carta de la baraja
    const perdirCarta = () => {
        if (deck.length === 0) {
            throw'No hay carta en el deck';
        }
        
        return deck.pop();
    }

    // Esta función se encarga de obtener el valor de las cartas
    const valorCarta = ( carta ) => {
        const valor = carta.substring(0,carta.length-1);
        return ( isNaN(valor) ) ? 
                ( valor === 'A' ) ? 11 : 10 
                : parseInt(valor);
    }

    // Acumular puntos
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    // Crear carta
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src   = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    // Función para determinar el ganador del juego.
    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if ( puntosComputadora === puntosMinimos ) {
                alert('Empatados');
            } else if (puntosMinimos > 21)  {
                alert('Computadora gana');
            }  else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            } 
        }, 100);
    }

    // Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {
            const carta = perdirCarta();     
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        // Llamada a esta función para validar quien es el ganador.
        determinarGanador();
    }

    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = perdirCarta();     
        const puntosJugador = acumularPuntos(carta, 0)

        crearCarta(carta, 0);
        
        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador)

        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });


    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });
})()