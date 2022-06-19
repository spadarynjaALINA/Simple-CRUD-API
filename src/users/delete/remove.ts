import { IUser } from "../../interfaces/user"

export let users:IUser[] = []
export const remove = async (id:string) =>
{
 return new Promise<void>( ( res, rej ):void =>
 {
   users = users.filter(u=>u.id !==id)
  //  const index = users.findIndex( ( i ) => i.id === id )
  //  users.slice(index,1)
res()
  } )
}
