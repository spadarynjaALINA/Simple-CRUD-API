import { IUserSend } from "../../interfaces/user";
import { users } from "../delete/remove";
import { v4 as uuidv4 } from 'uuid'
export const update = async ( id: string, user: IUserSend ) =>
{
  return new Promise( ( res, rej ) =>
  {
    const index = users.findIndex( ( i ) => i.id === id )
    users[index]={id, ...user}
    res(users[index] )
  } )
}
