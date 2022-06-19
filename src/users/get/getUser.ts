import http from "http"
import { IUser } from "../../interfaces/user"
import { allUsers } from "./allUsers"
import { userById } from "./userById"
export const getUser = async ( req:http.IncomingMessage, res: http.ServerResponse, id:string ) =>
{
  const user =await userById(id)
  if ( !user )
  {
 res.writeHead(404,{'Content-type':'application/json'})

  res.end(JSON.stringify({message:"User not found"}) )
  } else
  {
 res.writeHead(200,{'Content-type':'application/json'})

  res.end(JSON.stringify(user) )
  }
}
