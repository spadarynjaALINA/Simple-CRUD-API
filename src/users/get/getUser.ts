import http from "http"
import { IUser } from "../../interfaces/user"
import { allUsers } from "./allUsers"
import { userById } from "./userById"
import { validate as uuidValidate } from 'uuid'
import { version as uuidVersion } from 'uuid';
export const getUser = async ( req:http.IncomingMessage, res: http.ServerResponse, id:string ) =>
{
  try {


if(!(uuidValidate(id) && uuidVersion(id) === 4)){ res.writeHead(400,{'Content-type':'application/json'})

  res.end( JSON.stringify( { message: "id format not a UUID" } ) )
} else
{
  const user = await userById( id )
  if ( !user )
  {
 res.writeHead(404,{'Content-type':'application/json'})

  res.end(JSON.stringify({message:"User not found"}) )
  } else
  {
 res.writeHead(200,{'Content-type':'application/json'})

  res.end(JSON.stringify(user) )
  }} } catch (error) {
console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Internal server error",
      }),
    );
  }
}
