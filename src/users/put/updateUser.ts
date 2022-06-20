import http, { ServerResponse } from 'http'
import { userValidate } from '../../utils/userValidate'
import { userById } from '../get/userById'
import { getPostData } from '../post/getPostData'
import { update } from './update'
import { validate as uuidValidate } from 'uuid'
import { version as uuidVersion } from 'uuid';
export const updateUser = async ( req: http.IncomingMessage, res:ServerResponse, id:string ) =>
{
 try
 {
   if(!(uuidValidate(id) && uuidVersion(id) === 4)){ res.writeHead(400,{'Content-type':'application/json'})

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
       const body: string = await getPostData( req )


       const { username, age, hobbies } = JSON.parse( body )
       const userData = {
         username: username || user.username,
         age: age || user.age,
         hobbies: hobbies || user.hobbies
       }
       if ( await userValidate( JSON.stringify( userData ) ) )
       {
         const updateUser = await update( id, userData )
         res.writeHead( 200, { 'Content-type': 'application/json' } )
         return res.end( JSON.stringify( updateUser ) )
       } else
       {
         res.writeHead( 400, { 'Content-type': 'application/json' } )
         return res.end( JSON.stringify( { message: 'Fields have wrong types' } ) )

       }
     }
}} catch (error) {
  console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Internal server error",
      }),
    );
  }
}
