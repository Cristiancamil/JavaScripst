
/**
 * 
 * @param {String} carta 
 * @returns {HTMLImageElement} Imagen de retorno
 */
export const crearCartaHTML = ( carta ) => {

    if ( !carta ) throw new Error('La carta es un elemento obligatorio');

    const imgCarta = document.createElement('img');
    imgCarta.src = `./public/assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');

    return imgCarta;
}