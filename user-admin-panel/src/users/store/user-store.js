import { loadUsersByPage } from "../use-cases/load-users-by-page"

const state = {
    currentPage: 0, // Pagina actual
    users: []
}

// Función para cargar siguiente página.
const loadNextPage = async() => {
    const users = await loadUsersByPage( state.currentPage + 1 );
    if (users.length === 0) return;

    state.currentPage += 1;
    state.users = users;
}

// Función para cargar la página anterior
const loadPreviusPage = async() => {
    if (state.currentPage === 1) return
    const users = await loadUsersByPage( state.currentPage - 1 )  
    
    state.users = users;
    state.currentPage -= 1
}

// Función para identificar cuando usuario cambia
/**
 * @param {User} updatedUser 
 */
const onUserChanged = ( updatedUser ) => {

    let wastFound = false

    state.users = state.users.map( user => {
        if (user.id === updatedUser.id ){
            wastFound = true
            return updatedUser
        } 
        return user
    })

    if (state.users.length < 10 && !wastFound) {
        state.users.push( updatedUser )
    }
}

// Función para recargar la página actual
const reloadPage = async() => {
    const users = await loadUsersByPage( state.currentPage );
    if (users.length === 0) {
        await loadPreviusPage()
    }

    state.users = users;    
}

// Exportamos las funciones por defecto
export default {
    loadNextPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,

    // Definimos estas funciones para brindar acceso desde cualquier parte de la aplicación a las variables que tenemos en el state
    
    /**
     * @returns {Users[]}
     */
    getUsers: () => [...state.users], // Se usa el opeador spread para separar los elementos que tiene el array.
    
    /**
     * @returns Number}
     */
    getCurrentPage: () => state.currentPage // No se utiliza el operador spread por que los datos primirtivos pasan por valor
}