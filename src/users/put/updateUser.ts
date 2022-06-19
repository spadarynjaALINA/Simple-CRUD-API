import http, { ServerResponse } from 'http'
import { userById } from '../get/userById'
import { getPostData } from '../post/getPostData'
import { update } from './update'

export const updateUser = async ( req: http.IncomingMessage, res:ServerResponse, id:string ) =>
{
 try
 {
   const user = await userById( id )

    if ( !user )
  {
 res.writeHead(404,{'Content-type':'application/json'})

  res.end(JSON.stringify({message:"User not found"}) )
    } else
    {
      const body:string = await getPostData(req)


      const { username, age, hobbies } = JSON.parse( body )
      const userData = {
        username:username || user.username,
        age:age || user.age,
        hobbies: hobbies || user. hobbies
      }
    const updateUser =await update(id, userData )
    res.writeHead(200,{'Content-type':'application/json'})
    return res.end(JSON.stringify( updateUser))
}} catch (error) {
    console.error(error)
  }
}
