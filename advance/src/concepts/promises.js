import { heroes }from '../data/heroes'
/**
 * 
 * @param {HTMLDivElement} element 
 */
export const promisesComponent = (element) => {
    const renderHero = (hero) => {
        element.innerHTML = hero.name;
    }

    const renderTwoHero = (hero1, hero2) => {
        element.innerHTML =`
            <h3>${hero1.name}</h3>
            <h3>${hero2.name}</h3>
        `;
    }

    const renderError = (error) => {
        element.innerHTML = `
            <h1>Error:</h1>
            <h3> ${ error } </h3>
        `;
    }

    const id = '5d86371f233c9f2425f16916';
    const id2 = '5d86371f9f80b591f499df32';

    Promise.all([
        findHero(id),
        findHero(id2)
    ])
    .then( ([hero1, hero2]) => renderTwoHero(hero1, hero2) )
    .catch( renderError )
}

/**
 * 
 * @param {String} id 
 * @return {Promise}
 */
const findHero = ( id ) => {
    const hero = heroes.find( hero => hero.id === id );

    return new Promise((resolve, reject) => {
        if(hero) {
            resolve(hero);
            return;
        }
        reject(`Hero with ID ${ id } not found.`)
    })
}