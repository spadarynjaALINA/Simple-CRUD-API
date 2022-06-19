import { IUser } from "../../interfaces/user"

export let users:IUser[] = [ {id:"1",username:"Tom",
age:25,
  hobbies: []
},
  {
    id: "2", username: "Hanks",
age:25,
hobbies:['1','2']}]
export const remove = async (id:string) =>
{
 return new Promise<void>( ( res, rej ):void =>
 {
   users = users.filter(u=>u.id !==id)
res()
  } )
}
