import { heroes } from '../data/heroes'
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const asyncComponent = ( element ) => {

    const id = '5d86371f9f80b591f499df32';

    findHero(id)
        .then( name => element.innerHTML = name)
        .catch( error => element.innerHTML = error )
    
}


/**
 * 
 * @param {String} id 
 * @return {Promise}
 */
const findHero = async(id) =>{
    const hero = heroes.find( hero => hero.id === id );
    if(!hero)
        throw `Hero with id ${ id } not found.`
    return hero?.name;
}