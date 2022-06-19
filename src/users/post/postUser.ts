import http from 'http'
import { IUserSend } from '../../interfaces/user'
import { userValidate } from '../../utils/userValidate'
import { createUser } from './createUser'
import { getPostData } from './getPostData'

export const postUser = async ( req: http.IncomingMessage, res: http.ServerResponse ) =>
{
  try
  {
    const body: string = await getPostData( req )
if (await userValidate( body )) {
     const { username, age, hobbies } = JSON.parse( body )
      const user:IUserSend = {
        username,
        age,
        hobbies
      }

 const newUser =await createUser( user )
    res.writeHead(201,{'Content-type':'application/json'})
    return res.end(JSON.stringify(newUser))
    } else
{
       res.writeHead(400,{'Content-type':'application/json'})
    return res.end(JSON.stringify({message:'Body does not contain required fields or fields have wrong types'}))
     }

} catch (error) {
    console.error(error)
  }}
