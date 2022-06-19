import { resolve } from "path"
import { IUser } from "../../interfaces/user"
import { users } from "../delete/remove"

export const userById=(id:string):Promise<IUser | undefined> => {
  return new Promise( ( res, rej ) =>
  {
    const user= users.find( user => user.id === id )
    res(user)
  })
}
