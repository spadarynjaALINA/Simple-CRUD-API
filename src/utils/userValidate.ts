

export const userValidate = async ( u:string ):Promise<boolean> =>
{
  const user =JSON.parse(u)
  return user.hasOwnProperty( 'username' )
    && user.hasOwnProperty( 'age' )
    && user.hasOwnProperty( 'hobbies' )
    && Array.isArray( user.hobbies )
    && typeof user.username === "string"
    && typeof user.age === "number"
    &&  user.hobbies.every((item:string) => typeof item ==="string")
}
