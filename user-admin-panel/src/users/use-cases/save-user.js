import { LocalhostUserToModel } from '../mappers/localhost-user.mapper';
import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import { User } from '../models/user'

const fetchUsers = async () => {
    const url = `${ import.meta.env.VITE_BASE_URL }/users`;
    const res = await fetch(url);
    return await res.json();
};

const getNextUserId = async () => {
    const users = await fetchUsers();

    const maxId = users.reduce((max, user) => {
        const idNum = parseInt(user.id, 10);
        return isNaN(idNum) ? max : Math.max(max, idNum);
    }, 0);

    return (maxId + 1).toString();
};

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async ( userLike ) => {
    
    const user = new User( userLike )

    if ( !user.firstName || !user.lastName ) 
        throw 'Fisrt & last are required'
        

    const userToSave = userModelToLocalhost(user)
    let userUpdated

    if (user.id) {     
        userUpdated = await updatedUser( userToSave )
    } else {
        userToSave.id = await getNextUserId();
        userUpdated = await createUser( userToSave )
    }

    return LocalhostUserToModel( userUpdated )
    
}

/**
 * @param {Like<User>} user
 */
const createUser = async( user ) => {
    const url = `${ import.meta.env.VITE_BASE_URL }/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });


    const newUser = await res.json()
    return newUser
}

/**
 * @param {Like<User>} user
 */
const updatedUser = async( user ) => {
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${user.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });


    const updatedUser = await res.json()
    return updatedUser
}