import { IUserSend } from "../../interfaces/user";
import { v4 as uuidv4 } from 'uuid'
import { users } from './../delete/remove'
export const createUser = async ( user:IUserSend ) =>
{
  return new Promise( ( res, rej ) =>
  {
    const newUser = { id: uuidv4(), ...user }
    users.push( newUser )
res(newUser)
})
}
