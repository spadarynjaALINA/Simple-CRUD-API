import http from 'http'
import { userById } from '../get/userById'

import { IUserSend } from '../../interfaces/user'
import { createUser } from './createUser'
import { getPostData } from './getPostData'

export const postUser = async ( req: http.IncomingMessage, res: http.ServerResponse ) =>
{
  try
  {
    const body:string = await getPostData(req)
      const { username, age, hobbies } = JSON.parse( body )
      const user:IUserSend = {
        username,
        age,
        hobbies
      }
    const newUser =await createUser( user )
    res.writeHead(201,{'Content-type':'application/json'})
    return res.end(JSON.stringify(newUser))
} catch (error) {
    console.error(error)
  }}
