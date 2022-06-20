import{ server} from '../src/server'
import request from 'supertest'
import { IUser } from '../src/interfaces/user';
import { validate as uuidValidate } from 'uuid'
import { version as uuidVersion } from 'uuid';

afterEach( () => server.close() );
let id = ''

// script 1

describe( 'Script 1: GET', () =>
{
  test( 'Try to get all users', async() =>
  {
    const res = await request( server ).get( '/api/users' )

    expect(res.statusCode).toBe(200);
    expect( res.body ).toStrictEqual( [] )

  } )
  test( 'Try to get user by id', async () =>
  {
    const newUser = { username: 'user1', age: 25, hobbies: [] }
   const res = await request( server ).post( "/api/users" ).send( newUser ).then( async user =>
    {
   return await request(server).get(`/api/users/${user.body.id as string}`)
   } )
    expect( res.statusCode ).toBe( 200 )
    expect( res.body.username as IUser[] ).toBe( newUser.username )
    expect( res.body.age as IUser[] ).toBe( newUser.age )
    expect( res.body.hobbies as IUser[] ).toStrictEqual( newUser.hobbies )


  } )
  test( 'Try to get user with undefined id',async () =>
  {
    const someUndefinedId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'

    const res = await request( server ).get( `/api/users/${someUndefinedId}` )

    expect( res.statusCode ).toBe( 404 )
    expect( res.body.message ).toBe( "User not found" );
    expect( !( uuidValidate(someUndefinedId ) && uuidVersion(someUndefinedId ) === 4 ) ).toBeFalsy()
  } )
   test( 'Try to get user with wrong id',async () =>
  {
    const someWrongId = '123'
    const res = await request( server ).get( `/api/users/${someWrongId}` )

    expect( res.statusCode ).toBe( 400 )
    expect( ( uuidValidate( res.body.id ) && uuidVersion( res.body.id ) === 4 ) ).toBeFalsy()
  } )
  afterAll(()=>server.close())
} )

// script 2

describe( 'Script 2: POST', () =>
{
  test( 'try to post new user',async () =>
  {
    const newUser = { username: 'user2', age: 30, hobbies: ['1','2'] }
    const res = await request( server ).post( "/api/users" ).send( newUser ); id =res.body.id
    expect( res.statusCode ).toBe( 201 )
    expect(! ( uuidValidate( res.body.id ) && uuidVersion( res.body.id ) === 4 ) ).toBeFalsy()
  } )
   test( 'try to post new invalid user ',async () =>
  {
    const newUser = { username: 'user2', hobbies: ['1','2'] }
    const res = await request( server ).post( "/api/users" ).send( newUser )
    expect( res.statusCode ).toBe( 400 )

  })
})
describe( 'Script 3: PUT', () =>
{test( 'try to put user with invalid data',async () =>
  {
    const newWrongUserData = { username: 'user2', hobbies: 'some' }
    const res = await request( server ).put(`/api/users/${id}` ).send( newWrongUserData )
    expect( res.statusCode ).toBe( 400 )

  })
test( 'try to put user',async () =>
  {
  const newUserData = { username: 'newName' }
    const res = await request( server ).put(`/api/users/${id}` ).send( newUserData )
    expect( res.statusCode ).toBe( 200 )
    expect( res.body.username ).toBe(  newUserData.username )
} )

  test( 'try to put user with undefined Id',async () =>
  {
  const newUserData = { username: 'newName' }
  const undefinedId ='6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
    const res = await request( server ).put(`/api/users/${undefinedId}` ).send( newUserData )
    expect( res.statusCode ).toBe( 404 )
    expect( res.body.message ).toEqual( "User not found" );
  } )
  test( 'try to put user with wrong Id',async () =>
  {
  const newUserData = { username: 'newName' }
  const wrongId ='6ec0bd7f-11c0-43da-975e-2a8ad9ebae0'
    const res = await request( server ).put(`/api/users/${wrongId}` ).send( newUserData )
    expect( res.statusCode ).toBe( 400 )
    expect( res.body.message ).toEqual( "id format not a UUID" );
  })
 })

// script 4

describe( 'Script 4: DELETE', () =>
{
  test( 'try to remove user', async () =>
  {
    const res = await request( server ).delete( `/api/users/${id}` )
    expect( res.statusCode ).toBe( 204 )
    expect( res.body ).toBe('' );
  } )
   test( 'try to remove user with undefined id', async () =>
   {
      const undefinedId ='6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
    const res = await request( server ).delete( `/api/users/${ undefinedId}` )
    expect( res.statusCode ).toBe( 404 )
    expect( res.body.message ).toBe('User not found' );
   } )
   test( 'try to remove user with wrong id', async () =>
   {
      const wrongId ='6ec0bd7f-11c0-43da-975e-2a8ad9ebae0'
    const res = await request( server ).delete( `/api/users/${ wrongId}` )
    expect( res.statusCode ).toBe( 400 )
    expect( res.body.message ).toBe('id format not a UUID' );
   } )
} )

// script 5

describe( 'Script 5: URL', () =>
{
  test( 'try to request with wrong url', async () =>
  { const res = await request( server ).get( '/api/use' )

    expect( res.statusCode ).toBe( 404 );
    expect( res.body.message ).toBe('Route not found' );} )
})
