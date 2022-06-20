import http, { ServerResponse } from 'http'
import { userById } from '../get/userById'
import { validate as uuidValidate } from 'uuid'
import { version as uuidVersion } from 'uuid';
import { remove } from './remove'

export const removeUser = async ( req:http.IncomingMessage, res:http.ServerResponse, id:string ) =>
{
 try
 {

   if ( !( uuidValidate( id ) && uuidVersion( id ) === 4 ) )
   {
     res.writeHead( 400, { 'Content-type': 'application/json' } )

     res.end( JSON.stringify( { message: "id format not a UUID" } ) )
   } else
   {
     const user = await userById( id )

     if ( !user )
     {
       res.writeHead( 404, { 'Content-type': 'application/json' } )
       res.end( JSON.stringify( { message: "User not found" } ) )
     } else
     {
       await remove( id )

       res.writeHead( 204, { 'Content-type': 'application/json' } )
       return res.end( JSON.stringify( { message: `User ${id} removed` } ) )
     }
   }
 } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Internal server error",
      }),
    );

  }
}
