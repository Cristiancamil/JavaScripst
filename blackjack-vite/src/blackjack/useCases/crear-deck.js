import _ from "underscore";

/**
 * Esta función crea un nuevo deck
 * @param {Array<String>} tiposDeCarta ejemplo: ['C','D','H','S']
 * @param {Array<String>} cartasEspeciales ejemplo: ['A','J','Q','K']
 * @returns {Array} retorna un nuevo deck de cartas
 */
export const crearDeck = (tiposDeCarta, cartasEspeciales) => {

    // Validamos que TiposDeCarta no sea null ni undefined también que el tamaño del Array sea mayor que cero.
    if ( !tiposDeCarta || tiposDeCarta.length === 0) 
        throw new Error('TiposDeCarta es obligatorio como un arreglo de string');

    if ( !cartasEspeciales  || cartasEspeciales.length === 0) 
        throw new Error('CartasEspeciales es obligatorio como un arreglo de string');

    let deck = [];

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tiposDeCarta) {
            deck.push(i + tipo); 
        }
    }

    for (let tipo of tiposDeCarta) {
        for (let especial of cartasEspeciales) {
            deck.push(especial + tipo); 
        }
    }

    deck = _.shuffle(deck)
    return deck; 
}
