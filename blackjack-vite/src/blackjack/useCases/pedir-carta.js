import _ from 'underscore'

/**
 * @param {Array<String>} deck es un arreglo de string
 * @returns {String} retorna la carta que devuelve el método pop.
 */
export const perdirCarta = ( deck ) => {

    if (!deck || deck.length === 0) {
      throw'No hay carta en el deck';
    }

    const carta = deck.pop();
    return carta;
}
