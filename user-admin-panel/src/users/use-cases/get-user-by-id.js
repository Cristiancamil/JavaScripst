import { LocalhostUserToModel } from "../mappers/localhost-user.mapper"
import { User } from "../models/user"


/**
 * 
 * @param {String|Number} id 
 * @return { Promise<User> }
 */
export const getUsersById = async( id ) => {
    console.log(id);
    
    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`
    const res = await fetch(url)
    const data = await res.json()
    
    const user = LocalhostUserToModel(  data )
    
    return user
}