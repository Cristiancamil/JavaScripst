

// Aquí creamos la estructura del objeto del usuario que vamos a trabajar en la aplicación
export class User {

    /**
     * Aquí en el constructor desestructuramos el objeto que llega.
     * @param {Like<User>} userDataLike 
     */
    constructor({ id, isActive, balance, avatar, firstName, lastName, gender }) {
        this.id         = id
        this.isActive   = isActive
        this.balance    = balance
        this.avatar     = avatar
        this.firstName  = firstName
        this.lastName   = lastName
        this.gender     = gender
    }
}