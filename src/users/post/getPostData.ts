import http from 'http'


export const getPostData = async ( req:http.IncomingMessage):Promise<string> =>
{
  return new Promise((res,rej)  =>
  {
    try
    {
      let body = ''
      req.on( 'data', ( chunk ) =>
      {body+=chunk.toString()

      })
      req.on( 'end',()=> {
  res(body)
})
    } catch ( err )
    {
     rej(err)
    }
  })
}
