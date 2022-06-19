import http from 'http';
import { removeUser } from './users/delete/removeUser';
import { getUser } from './users/get/getUser';
import { getUsers } from './users/get/getUsers';
import { postUser } from './users/post/postUser';
import { updateUser } from './users/put/updateUser';

const server = http.createServer( ( req, res ) =>
{
  if ( req.url === '/api/users'&& req.method==='GET' )
  {
   getUsers(req,res)

  } else if(req.url?.match(/\/api\/users\/([0-9]+)/)&& req.method==='GET'){
    const id = req.url.split( '/' )[3]
    getUser(req, res, id)
  } else if ( req.url === '/api/users'&& req.method==='POST')
  {
    postUser( req, res )
     } else if(req.url?.match(/\/api\/users\/([0-9]+)/)&& req.method==='PUT'){
    const id = req.url.split( '/' )[3]
   updateUser(req, res, id)
  } else if(req.url?.match(/\/api\/users\/([0-9]+)/)&& req.method==='DELETE'){
    const id = req.url.split( '/' )[3]
  removeUser(req, res, id)
  } else
  {
     res.writeHead(404,{'Content-type':'application/json'})

  res.end(JSON.stringify({message:'Route not found'}) )
  }

} );
const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>console.log(`Server running on port ${PORT},`));
