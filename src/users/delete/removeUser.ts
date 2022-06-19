import http, { ServerResponse } from 'http'
import { userById } from '../get/userById'
import { getPostData } from '../post/getPostData'
import { remove } from './remove'

export const removeUser = async ( req:http.IncomingMessage, res:http.ServerResponse, id:string ) =>
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
await remove(id)

    res.writeHead(200,{'Content-type':'application/json'})
    return res.end(JSON.stringify({ message:`User ${id} removed`}))
}} catch (error) {
    console.error(error)
  }
}
