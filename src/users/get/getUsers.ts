
import http from 'http';
import { allUsers } from './allUsers';

export const getUsers = async (req:http.IncomingMessage, res: http.ServerResponse ) =>
{
  try
  {
    const users = await allUsers()
 res.writeHead(200,{'Content-type':'application/json'})

  res.end(JSON.stringify(users) )

  } catch(err) {
     console.log(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Internal server error",
      }),
    );
  }

}
