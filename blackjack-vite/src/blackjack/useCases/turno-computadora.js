import { crearCartaHTML, perdirCarta, valorCarta } from "./";

/**
 * Esta función ejecuta el truno de la computadora
 * @param {Number} puntosMinimos puntos minimos que la computadaroa necesita para ganar.
 * @param {HTMLElement} puntosHTML elemento HTML para mostrar los puntos.
 * @param {HTMLElement} divCartasComputadora elemento HTML para mostrar las cartas.
 * @param {Array<String>} deck 
 */
export const turnoComputadora = ( puntosMinimos, puntosHTML, divCartasComputadora, deck = [] ) => {

    if (!puntosMinimos) throw new Error('Puntos minimos son necesarios');
    if (!puntosHTML) throw new Error('Argumento puntosHTML es necesarios');
    
    let puntosComputadora = 0;

    do {
        const carta = perdirCarta( deck ); 

        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = crearCartaHTML( carta )
        divCartasComputadora.append( imgCarta )

        if (puntosMinimos > 21) {
            break
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    
    setTimeout(() => {
    if( puntosComputadora === puntosMinimos ) {
        alert('Nadie gana :(');
    } else if ( puntosMinimos > 21 ) {
        alert('Computadora gana')
    } else if( puntosComputadora > 21 ) {
        alert('Jugador Gana');
    } else {
        alert('Computadora Gana')
    }
    }, 100 );
}