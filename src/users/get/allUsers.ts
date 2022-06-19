import { IUser } from "../../interfaces/user"
import { users } from "../delete/remove"

export const allUsers=():Promise<IUser[]> => {
  return new Promise( ( res, rej ) =>
  {
    res(users)
  })
}
// {id:"1",username:"Tom",
// age:25,
// hobbies:[]},{id:"2",username:"Hanks",
// age:25,
// hobbies:['1','2']}
